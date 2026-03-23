import { supabase } from "@/lib/supabase";
import type { Metadata } from "next";
import Link from "next/link";
import ActivityCard from "@/components/ActivityCard";
import NewsCard from "@/components/NewsCard";
import CommunityLinkCard from "@/components/CommunityLinkCard";
import ActivityCardImage from "@/components/ActivityCardImage";

export const metadata: Metadata = {
  title: "สำรวจ",
  description:
    "รวมกิจกรรมล่าสุดและช่องทางติดตามทั้งหมดของชุมชนบ้านทุ่งมนไว้ในที่เดียว",
  openGraph: {
    title: "สำรวจ | บ้านทุ่งมน",
    description:
      "รวมกิจกรรมล่าสุดและช่องทางติดตามทั้งหมดของชุมชนบ้านทุ่งมนไว้ในที่เดียว",
    url: "/explore",
    type: "website",
    locale: "th_TH",
  },
  twitter: {
    card: "summary",
    title: "สำรวจ | บ้านทุ่งมน",
    description:
      "รวมกิจกรรมล่าสุดและช่องทางติดตามทั้งหมดของชุมชนบ้านทุ่งมนไว้ในที่เดียว",
  },
  alternates: { canonical: "/explore" },
};

// cache for 5 minutes
export const revalidate = 300;

export default async function ExplorePage() {
  const [activitiesResult, linksResult, placesResult, newsResult] =
    await Promise.all([
      supabase
        .from("activities")
        .select()
        .order("activity_date", { ascending: false })
        .limit(3),
      supabase.from("community_links").select().order("sort_order").limit(5),
      supabase
        .from("places")
        .select("id, slug, title, cover_image, category, excerpt")
        .eq("is_public", true)
        .order("created_at", { ascending: false })
        .limit(3),
      supabase
        .from("news")
        .select("id, slug, title, news_date, category, excerpt")
        .eq("is_public", true)
        .order("news_date", { ascending: false })
        .limit(3),
    ]);

  const activities = activitiesResult.data ?? [];
  const links = linksResult.data ?? [];
  const places = placesResult.data ?? [];
  const newsList = newsResult.data ?? [];

  return (
    <main className="bg-neutral-100">
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
        {/* ─── Latest news ─── */}
        {newsList.length > 0 && (
          <section>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-zinc-900">ข่าวสารล่าสุด</h2>
              <Link
                href="/news"
                className="text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900"
              >
                ดูทั้งหมด →
              </Link>
            </div>
            <div className="flex flex-col gap-4">
              {newsList.map((item) => (
                <NewsCard key={item.id} {...item} />
              ))}
            </div>
          </section>
        )}

        {/* ─── Latest activities ─── */}
        {activities.length > 0 && (
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
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {activities.map((activity) => (
                <ActivityCard key={activity.id} {...activity} />
              ))}
            </div>
          </section>
        )}

        {/* ─── Places ─── */}
        {places.length > 0 && (
          <section>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-zinc-900">
                สถานที่น่าสนใจ
              </h2>
              <Link
                href="/places"
                className="text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900"
              >
                ดูทั้งหมด →
              </Link>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {places.map((place) => (
                <Link
                  key={place.id}
                  href={`/places/${place.slug}`}
                  className="group block overflow-hidden rounded-3xl bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <ActivityCardImage
                      src={place.cover_image}
                      alt={place.title}
                    />
                  </div>
                  <div className="p-6">
                    <div className="mb-3 flex items-center gap-2">
                      <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-700">
                        {place.category}
                      </span>
                    </div>
                    <h3 className="mb-2 text-base leading-snug font-bold text-zinc-900 underline decoration-zinc-900/0 underline-offset-2 transition-all group-hover:decoration-zinc-900/20">
                      {place.title}
                    </h3>
                    <p className="line-clamp-2 text-sm leading-relaxed text-zinc-500">
                      {place.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ─── Community links ─── */}
        {links.length > 0 && (
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
            <div className="grid gap-4 sm:grid-cols-2">
              {links.map((l) => (
                <CommunityLinkCard key={l.id} link={l} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
