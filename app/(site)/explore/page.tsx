import { supabase } from "@/lib/supabase";
import Link from "next/link";
import ActivityCard from "@/components/ActivityCard";
import CommunityLinkCard from "@/components/CommunityLinkCard";

export const revalidate = 0;

export default async function ExplorePage() {
  const [activitiesResult, linksResult] = await Promise.all([
    supabase
      .from("activities")
      .select("id, slug, title, activity_date, cover_image, category, excerpt")
      .order("activity_date", { ascending: false })
      .limit(3),
    supabase.from("community_links").select().order("sort_order").limit(5),
  ]);

  const activities = activitiesResult.data ?? [];
  const links = linksResult.data ?? [];

  return (
    <main className="min-h-screen bg-neutral-100">
      {/* ─── Page header ─── */}
      <div className="border-b border-black/6 bg-white py-20 text-center">
        <p className="mb-3 text-xs font-medium tracking-[0.22em] text-zinc-500 uppercase">
          ชุมชนบ้านทุ่งมน
        </p>
        <h1 className="text-5xl font-bold tracking-tight text-zinc-900">
          สำรวจ
        </h1>
        <p className="mt-4 text-base text-zinc-500">
          รวมทุกอย่างของชุมชนบ้านทุ่งมนไว้ในที่เดียว
        </p>
      </div>

      <div className="mx-auto max-w-6xl space-y-14 px-6 py-14">
        {/* ─── Latest activities ─── */}
        <section>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold text-zinc-900">กิจกรรมล่าสุด</h2>
            <Link
              href="/activities"
              className="text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900"
            >
              ดูทั้งหมด →
            </Link>
          </div>

          {activities.length === 0 ? (
            <div className="rounded-3xl bg-white p-12 text-center">
              <p className="text-zinc-500">ยังไม่มีข้อมูลกิจกรรม</p>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {activities.map((activity) => (
                <ActivityCard key={activity.id} {...activity} />
              ))}
            </div>
          )}
        </section>

        {/* ─── Community links ─── */}
        <section>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold text-zinc-900">ช่องทางติดตาม</h2>
            <Link
              href="/links"
              className="text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900"
            >
              ดูทั้งหมด →
            </Link>
          </div>

          {links.length === 0 ? (
            <div className="rounded-3xl bg-white p-12 text-center">
              <p className="text-zinc-500">ยังไม่มีข้อมูลช่องทาง</p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {links.map((l) => (
                <CommunityLinkCard key={l.id} link={l} />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
