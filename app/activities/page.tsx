import { supabase } from "@/lib/supabase";
import Link from "next/link";
import ActivityCardImage from "./ActivityCardImage";
import { displayDate } from "@/lib/date";

export default async function ActivitiesPage() {
  const { data: activities, error } = await supabase
    .from("activities")
    .select(
      "id, slug, title, activity_date, cover_image, category, excerpt, description, created_at",
    )
    .order("activity_date", { ascending: false });

  console.log("Fetched activities:", activities);
  console.log("Fetch error:", error);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-red-500">เกิดข้อผิดพลาดในการโหลดกิจกรรม</p>
      </div>
    );
  }

  return (
    <>
      {/* ─── Navbar ─── */}
      <header className="sticky top-0 z-50 border-b border-black/6 bg-white/80 backdrop-blur-2xl">
        <nav className="mx-auto flex h-14 max-w-6xl items-center gap-2 px-6 text-[13px]">
          <Link
            href="/"
            className="text-[#6e6e73] transition-colors hover:text-[#1d1d1f]"
          >
            ← บ้านทุ่งมน
          </Link>
          <span className="text-[#6e6e73]/40">/</span>
          <span className="font-medium text-[#1d1d1f]">กิจกรรม</span>
        </nav>
      </header>

      <main className="min-h-screen bg-[#f5f5f7]">
        {/* ─── Page header ─── */}
        <div className="border-b border-black/6 bg-white py-20 text-center">
          <p className="mb-3 text-[11px] font-medium tracking-[0.22em] text-[#6e6e73] uppercase">
            ชุมชนบ้านทุ่งมน
          </p>
          <h1 className="text-5xl font-bold tracking-tight text-[#1d1d1f]">
            กิจกรรม
          </h1>
          <p className="mt-4 text-base text-[#6e6e73]">
            ติดตามกิจกรรมและเหตุการณ์ต่าง ๆ ของชุมชนบ้านทุ่งมน
          </p>
        </div>

        {/* ─── Cards grid ─── */}
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {activities.map((activity) => (
              <Link
                key={activity.id}
                href={`/activities/${activity.id}`}
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
                    <span className="rounded-full bg-rose-100 px-2.5 py-1 text-[11px] font-medium text-rose-700">
                      {activity.category}
                    </span>
                    <span className="text-[12px] text-[#6e6e73]">
                      {displayDate(activity.activity_date)}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="mb-2 text-base leading-snug font-bold text-[#1d1d1f] underline decoration-[#1d1d1f]/0 underline-offset-2 transition-all group-hover:decoration-[#1d1d1f]/20">
                    {activity.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="line-clamp-2 text-[13px] leading-relaxed text-[#6e6e73]">
                    {activity.excerpt}
                  </p>

                  {/* Arrow CTA */}
                  <div className="mt-5 flex items-center gap-1 text-[13px] font-medium text-[#1d1d1f]">
                    ดูรายละเอียด
                    <span className="transition-transform duration-200 group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
