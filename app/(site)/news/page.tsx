import { supabase } from "@/lib/supabase";
import type { Metadata } from "next";
import Pagination from "@/components/Pagination";
import NewsCard from "@/components/NewsCard";
import ErrorView from "@/components/ErrorView";

export const metadata: Metadata = {
  title: "ข่าวสาร",
  description: "ติดตามข่าวสารและประกาศต่าง ๆ ของชุมชนบ้านทุ่งมน",
  openGraph: {
    title: "ข่าวสาร | บ้านทุ่งมน",
    description: "ติดตามข่าวสารและประกาศต่าง ๆ ของชุมชนบ้านทุ่งมน",
    url: "/news",
    type: "website",
    locale: "th_TH",
  },
  twitter: {
    card: "summary",
    title: "ข่าวสาร | บ้านทุ่งมน",
    description: "ติดตามข่าวสารและประกาศต่าง ๆ ของชุมชนบ้านทุ่งมน",
  },
  alternates: { canonical: "/news" },
};

const PAGE_SIZE = 9;

// cache for 5 minutes
export const revalidate = 300;

export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, parseInt(pageParam ?? "1", 10) || 1);
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const {
    data: newsList,
    error,
    count,
  } = await supabase
    .from("news")
    .select("*", {
      count: "exact",
    })
    .eq("is_public", true)
    .order("news_date", { ascending: false })
    .range(from, to);

  if (error) {
    return (
      <ErrorView message="เกิดข้อผิดพลาดในการโหลดข่าวสาร กรุณาลองใหม่อีกครั้ง" />
    );
  }

  const totalPages = Math.ceil((count ?? 0) / PAGE_SIZE);

  return (
    <>
      <main className="bg-neutral-100">
        {/* ─── Page header ─── */}
        <div className="border-b border-black/6 bg-white py-20 text-center">
          <p className="mb-3 text-xs font-medium tracking-[0.22em] text-zinc-500 uppercase">
            ชุมชนบ้านทุ่งมน
          </p>
          <h1 className="text-5xl font-bold tracking-tight text-zinc-900">
            ข่าวสาร
          </h1>
          <p className="mt-4 text-base text-zinc-500">
            ติดตามข่าวสารและประกาศต่าง ๆ ของชุมชนบ้านทุ่งมน
          </p>
        </div>

        {/* ─── Cards grid ─── */}
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="flex flex-col gap-4">
            {newsList?.length === 0 && (
              <div className="rounded-3xl bg-white p-12 text-center">
                <p className="text-xl text-zinc-500">ยังไม่มีข่าวสาร</p>
              </div>
            )}

            {newsList?.map((item) => (
              <NewsCard key={item.id} {...item} />
            ))}
          </div>

          <Pagination
            currentPage={page}
            totalPages={totalPages}
            basePath="/news"
          />
        </div>
      </main>
    </>
  );
}
