import type { Metadata } from "next";
import Link from "next/link";
import { ACTIVITIES } from "./data";

export const metadata: Metadata = {
  title: "กิจกรรม | บ้านทุ่งมน",
  description: "ติดตามกิจกรรมและเหตุการณ์ต่าง ๆ ของชุมชนบ้านทุ่งมน",
};

export default function ActivitiesPage() {
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
            {ACTIVITIES.map((activity) => (
              <Link
                key={activity.id}
                href={`/activities/${activity.id}`}
                className="group block overflow-hidden rounded-3xl bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl"
              >
                {/* Cover */}
                <div className="relative aspect-video overflow-hidden">
                  {/* Cover image */}
                  {activity.coverImage && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={activity.coverImage}
                      alt={activity.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Meta row */}
                  <div className="mb-3 flex items-center gap-2">
                    <span
                      className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${activity.categoryStyle}`}
                    >
                      {activity.category}
                    </span>
                    <span className="text-[12px] text-[#6e6e73]">
                      {activity.date}
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
