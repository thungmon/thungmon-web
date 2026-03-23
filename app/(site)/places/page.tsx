import { supabase } from "@/lib/supabase";
import type { Metadata } from "next";
import Link from "next/link";
import ActivityCardImage from "@/components/ActivityCardImage";
import ErrorView from "@/components/ErrorView";
import Pagination from "@/components/Pagination";

export const metadata: Metadata = {
  title: "สถานที่น่าสนใจ",
  description: "รวมสถานที่น่าสนใจในชุมชนบ้านทุ่งมน",
  openGraph: {
    title: "สถานที่น่าสนใจ | บ้านทุ่งมน",
    description: "รวมสถานที่น่าสนใจในชุมชนบ้านทุ่งมน",
    url: "/places",
    type: "website",
    locale: "th_TH",
  },
  twitter: {
    card: "summary",
    title: "สถานที่น่าสนใจ | บ้านทุ่งมน",
    description: "รวมสถานที่น่าสนใจในชุมชนบ้านทุ่งมน",
  },
  alternates: { canonical: "/places" },
};

const PAGE_SIZE = 9;

// cache for 5 minutes
export const revalidate = 300;

export default async function PlacesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, parseInt(pageParam ?? "1", 10) || 1);
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const {
    data: places,
    error,
    count,
  } = await supabase
    .from("places")
    .select("id, slug, title, cover_image, category, excerpt", {
      count: "exact",
    })
    .eq("is_public", true)
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) {
    return (
      <ErrorView message="เกิดข้อผิดพลาดในการโหลดสถานที่ กรุณาลองใหม่อีกครั้ง" />
    );
  }

  const totalPages = Math.ceil((count ?? 0) / PAGE_SIZE);

  return (
    <main className="bg-neutral-100">
      {/* ─── Page header ─── */}
      <div className="border-b border-black/6 bg-white py-20 text-center">
        <p className="mb-3 text-xs font-medium tracking-[0.22em] text-zinc-500 uppercase">
          ชุมชนบ้านทุ่งมน
        </p>
        <h1 className="text-5xl font-bold tracking-tight text-zinc-900">
          สถานที่น่าสนใจ
        </h1>
        <p className="mt-4 text-base text-zinc-500">
          รวมสถานที่น่าสนใจในชุมชนบ้านทุ่งมน
        </p>
      </div>

      {/* ─── Cards grid ─── */}
      <div className="mx-auto max-w-6xl px-6 py-14">
        {places.length === 0 ? (
          <p className="text-center text-zinc-400">
            ยังไม่มีสถานที่น่าสนใจในขณะนี้
          </p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {places.map((place) => (
              <Link
                key={place.id}
                href={`/places/${place.slug}`}
                className="group block overflow-hidden rounded-3xl bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl"
              >
                {/* Cover */}
                <div className="relative aspect-video overflow-hidden">
                  <ActivityCardImage
                    src={place.cover_image}
                    alt={place.title}
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-700">
                      {place.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-zinc-400">
                      <svg
                        className="h-3 w-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                        />
                      </svg>
                      ดูแผนที่
                    </span>
                  </div>

                  <h2 className="mb-2 text-base leading-snug font-bold text-zinc-900 underline decoration-zinc-900/0 underline-offset-2 transition-all group-hover:decoration-zinc-900/20">
                    {place.title}
                  </h2>

                  <p className="line-clamp-2 text-sm leading-relaxed text-zinc-500">
                    {place.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
        <Pagination currentPage={page} totalPages={totalPages} />
      </div>
    </main>
  );
}
