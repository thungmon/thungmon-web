import { supabase } from "@/lib/supabase";
import Link from "next/link";
import ActivityCardImage from "./ActivityCardImage";
import Pagination from "@/components/Pagination";
import { displayDate } from "@/lib/date";
import ErrorView from "@/components/ErrorView";
import SubpageNavbar from "@/components/SubpageNavbar";

const PAGE_SIZE = 6;
export const revalidate = 0;

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
      <>
        <SubpageNavbar breadcrumbs={[{ label: "กิจกรรม" }]} />
        <ErrorView message="เกิดข้อผิดพลาดในการโหลดกิจกรรม กรุณาลองใหม่อีกครั้ง" />
      </>
    );
  }

  const totalPages = Math.ceil((count ?? 0) / PAGE_SIZE);

  return (
    <>
      <SubpageNavbar breadcrumbs={[{ label: "กิจกรรม" }]} />
      <main className="min-h-screen bg-neutral-100">
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
              <Link
                key={activity.id}
                href={`/activities/${activity.slug}`}
                className="group block overflow-hidden rounded-3xl bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl"
              >
                {/* Cover */}
                <div className="relative aspect-video overflow-hidden">
                  {/* Cover image */}
                  <ActivityCardImage
                    src={activity.cover_image}
                    alt={activity.title}
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Meta row */}
                  <div className="mb-3 flex items-center gap-2">
                    <span className="rounded-full bg-rose-100 px-2.5 py-1 text-xs font-medium text-rose-700">
                      {activity.category}
                    </span>
                    <span className="text-xs text-zinc-500">
                      {displayDate(activity.activity_date)}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="mb-2 text-base leading-snug font-bold text-zinc-900 underline decoration-zinc-900/0 underline-offset-2 transition-all group-hover:decoration-zinc-900/20">
                    {activity.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="line-clamp-2 text-sm leading-relaxed text-zinc-500">
                    {activity.excerpt}
                  </p>

                  {/* Arrow CTA */}
                  <div className="mt-5 flex items-center gap-1 text-sm font-medium text-zinc-900">
                    ดูรายละเอียด
                    <span className="transition-transform duration-200 group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <Pagination currentPage={page} totalPages={totalPages} />
        </div>
      </main>
    </>
  );
}
