import type { Tables } from "@/database.types";

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

export default function CommunityLinkCard({ link }: { link: CommunityLink }) {
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
      <div
        className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-bold"
        style={{ backgroundColor: pCfg.bg, color: pCfg.fg }}
        aria-label={pCfg.name}
      >
        {pCfg.label}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm leading-snug font-semibold text-zinc-900 underline decoration-zinc-900/0 underline-offset-2 transition-all group-hover:decoration-zinc-900/25">
          {link.title}
        </p>
        <p className="mt-0.5 text-xs text-zinc-500">{pCfg.name}</p>
        {link.description && (
          <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-zinc-500">
            {link.description}
          </p>
        )}
        <p className="mt-2 truncate text-xs text-zinc-400">{domain}</p>
      </div>
      <div className="shrink-0 self-center text-zinc-300 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-zinc-500">
        →
      </div>
    </a>
  );
}
