import { supabase } from "@/lib/supabase";
import type { Metadata } from "next";
import Pagination from "@/components/Pagination";
import ActivityCard from "@/components/ActivityCard";
import ErrorView from "@/components/ErrorView";

export const metadata: Metadata = {
  title: "กิจกรรม",
  description: "ติดตามกิจกรรมและเหตุการณ์ต่าง ๆ ของชุมชนบ้านทุ่งมน",
  openGraph: {
    title: "กิจกรรม | บ้านทุ่งมน",
    description: "ติดตามกิจกรรมและเหตุการณ์ต่าง ๆ ของชุมชนบ้านทุ่งมน",
    url: "/activities",
    type: "website",
    locale: "th_TH",
  },
  twitter: {
    card: "summary",
    title: "กิจกรรม | บ้านทุ่งมน",
    description: "ติดตามกิจกรรมและเหตุการณ์ต่าง ๆ ของชุมชนบ้านทุ่งมน",
  },
  alternates: { canonical: "/activities" },
};

const PAGE_SIZE = 6;

// cache for 5 minutes
export const revalidate = 300;

export default async function ActivitiesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, parseInt(pageParam ?? "1", 10) || 1);
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const {
    data: activities,
    error,
    count,
  } = await supabase
    .from("activities")
    .select(
      "id, slug, title, activity_date, cover_image, category, excerpt, created_at",
      { count: "exact" },
    )
    .order("activity_date", { ascending: false })
    .range(from, to);

  if (error) {
    return (
      <ErrorView message="เกิดข้อผิดพลาดในการโหลดกิจกรรม กรุณาลองใหม่อีกครั้ง" />
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
            กิจกรรม
          </h1>
          <p className="mt-4 text-base text-zinc-500">
            ติดตามกิจกรรมและเหตุการณ์ต่าง ๆ ของชุมชนบ้านทุ่งมน
          </p>
        </div>

        {/* ─── Cards grid ─── */}
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {/* Empty */}
            {activities.length === 0 && (
              <div className="col-span-full rounded-3xl bg-white p-12 text-center">
                <p className="text-xl text-zinc-500">ยังไม่มีข้อมูลกิจกรรม</p>
              </div>
            )}

            {activities.map((activity) => (
              <ActivityCard key={activity.id} {...activity} />
            ))}
          </div>

          <Pagination
            currentPage={page}
            totalPages={totalPages}
            basePath="/activities"
          />
        </div>
      </main>
    </>
  );
}
