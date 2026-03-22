import { supabase } from "@/lib/supabase";
import type { Tables } from "@/database.types";
import ErrorView from "@/components/ErrorView";
import SubpageNavbar from "@/components/SubpageNavbar";

type CommunityLink = Tables<"community_links">;

const PLATFORM_CONFIG: Record<
  Tables<"community_links">["platform"],
  { bg: string; fg: string; label: string; name: string }
> = {
  facebook: { bg: "#1877F2", fg: "#fff", label: "f", name: "Facebook" },
  line: { bg: "#06C755", fg: "#fff", label: "L", name: "LINE" },
  youtube: { bg: "#FF0000", fg: "#fff", label: "▶", name: "YouTube" },
  tiktok: { bg: "#010101", fg: "#fff", label: "T", name: "TikTok" },
  instagram: { bg: "#E4405F", fg: "#fff", label: "ig", name: "Instagram" },
  shopee: { bg: "#EE4D2D", fg: "#fff", label: "S", name: "Shopee" },
  lazada: { bg: "#0F146B", fg: "#fff", label: "Lz", name: "Lazada" },
  twitter: { bg: "#000000", fg: "#fff", label: "𝕏", name: "X" },
  website: { bg: "#636366", fg: "#fff", label: "W", name: "เว็บไซต์" },
};

export const revalidate = 0;

export default async function LinksPage() {
  const { data: communityLinks, error } = await supabase
    .from("community_links")
    .select()
    .order("sort_order");

  if (error) {
    return (
      <>
        <SubpageNavbar breadcrumbs={[{ label: "ช่องทางติดตาม" }]} />
        <ErrorView message="เกิดข้อผิดพลาดในการโหลดช่องทางติดตาม กรุณาลองใหม่อีกครั้ง" />
      </>
    );
  }

  return (
    <>
      <SubpageNavbar breadcrumbs={[{ label: "ช่องทางติดตาม" }]} />
      <main className="min-h-screen bg-neutral-100">
        {/* ─── Page header ─── */}
        <div className="border-b border-black/6 bg-white py-20 text-center">
          <p className="mb-3 text-xs font-medium tracking-[0.22em] text-zinc-500 uppercase">
            ชุมชนบ้านทุ่งมน
          </p>
          <h1 className="text-5xl font-bold tracking-tight text-zinc-900">
            ช่องทางติดตาม
          </h1>
          <p className="mt-4 text-base text-zinc-500">
            รวมทุกช่องทางที่เชื่อมต่อกับชุมชนบ้านทุ่งมน
          </p>
        </div>

        {communityLinks.length === 0 && (
          <div className="mx-auto max-w-5xl px-6 py-14">
            <div className="rounded-3xl bg-white p-16 text-center">
              <p className="text-zinc-500">ยังไม่มีข้อมูลช่องทาง</p>
            </div>
          </div>
        )}

        {/* ─── Content ─── */}
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 px-6 py-14 sm:grid-cols-2">
          {communityLinks.map((l) => (
            <LinkCard key={l.id} link={l} />
          ))}
        </div>
      </main>
    </>
  );
}

// ─── LinkCard ─────────────────────────────────────────────────────────────────

function LinkCard({ link }: { link: CommunityLink }) {
  const platform = link.platform ?? "website";
  const pCfg = PLATFORM_CONFIG[platform] ?? PLATFORM_CONFIG.website;

  let domain = link.url;
  try {
    domain = new URL(link.url).hostname.replace(/^www\./, "");
  } catch {
    // url is not valid — show as-is
  }

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-start gap-4 rounded-2xl bg-white p-5 shadow-sm transition-shadow duration-200 hover:shadow-md"
    >
      {/* Platform icon */}
      <div
        className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-bold"
        style={{ backgroundColor: pCfg.bg, color: pCfg.fg }}
        aria-label={pCfg.name}
      >
        {pCfg.label}
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm leading-snug font-semibold text-zinc-900 underline decoration-zinc-900/0 underline-offset-2 transition-all group-hover:decoration-zinc-900/25">
            {link.title}
          </p>
        </div>
        <p className="mt-0.5 text-xs text-zinc-500">{pCfg.name}</p>
        {link.description && (
          <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-zinc-500">
            {link.description}
          </p>
        )}
        <p className="mt-2 truncate text-xs text-zinc-400">{domain}</p>
      </div>

      {/* Arrow */}
      <div className="shrink-0 self-center text-zinc-300 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-zinc-500">
        →
      </div>
    </a>
  );
}
