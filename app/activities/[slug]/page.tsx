import type { Metadata } from "next";
import Link from "next/link";
import { PhotoGallery } from "./PhotoGallery";
import { supabase } from "@/lib/supabase";
import { displayDate } from "@/lib/date";
import { redirect } from "next/navigation";

export const revalidate = 0;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const { data: activity } = await supabase
    .from("activities")
    .select("title, excerpt, cover_image, activity_date, category, slug")
    .eq("slug", decodeURIComponent(slug))
    .single();

  if (!activity) return {};

  const title = activity.title;
  const description = activity.excerpt;
  const url = `/activities/${activity.slug}`;
  const images = activity.cover_image
    ? [
        {
          url: activity.cover_image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ]
    : [];

  return {
    title,
    description,
    openGraph: {
      title: `${title} | บ้านทุ่งมน`,
      description,
      url,
      type: "article",
      locale: "th_TH",
      images,
      publishedTime: activity.activity_date,
      tags: [activity.category, "บ้านทุ่งมน", "ทุ่งมน", "ยโสธร"],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | บ้านทุ่งมน`,
      description,
      images: activity.cover_image ? [activity.cover_image] : undefined,
    },
    alternates: {
      canonical: url,
    },
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function ActivityDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: activity, error } = await supabase
    .from("activities")
    .select(
      "id, slug, title, activity_date, cover_image, category, excerpt, description, created_at, activity_images (id, filename, url, caption, sort_order, created_at)",
    )
    .eq("slug", decodeURIComponent(slug))
    .single();

  if (error || !activity) {
    return redirect("/activities");
  }

  return (
    <>
      {/* ─── Navbar ─── */}
      <header className="sticky top-0 z-50 border-b border-black/6 bg-white/80 backdrop-blur-2xl">
        <nav className="mx-auto flex h-14 max-w-6xl items-center gap-2 px-6 text-[13px]">
          <Link
            href="/"
            className="shrink-0 text-[#6e6e73] transition-colors hover:text-[#1d1d1f]"
          >
            บ้านทุ่งมน
          </Link>
          <span className="text-[#6e6e73]/40">/</span>
          <Link
            href="/activities"
            className="shrink-0 text-[#6e6e73] transition-colors hover:text-[#1d1d1f]"
          >
            กิจกรรม
          </Link>
          <span className="text-[#6e6e73]/40">/</span>
          <span className="max-w-50 truncate font-medium text-[#1d1d1f]">
            {activity.title}
          </span>
        </nav>
      </header>

      <main className="min-h-screen bg-white">
        {/* ─── Hero ─── */}
        <div className="relative">
          {/* Cover image / fallback gradient */}
          {activity.cover_image ? (
            <div className="relative h-[55vh] min-h-72 overflow-hidden">
              {/* Gradient fallback behind image */}
              <div className="absolute inset-0 bg-linear-to-br" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activity.cover_image}
                alt={activity.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
              {/* Dark scrim for text legibility */}
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
              {/* Text pinned to bottom */}
              <div className="absolute right-0 bottom-0 left-0 px-6 pb-10 text-center">
                <span className="mb-4 inline-block rounded-full bg-rose-100 px-3 py-1 text-xs font-medium text-rose-700">
                  {activity.category}
                </span>
                <h1 className="mt-2 text-4xl leading-[1.15] font-bold tracking-tight text-white md:text-5xl">
                  {activity.title}
                </h1>
                <p className="mt-3 text-sm text-white/70">
                  {displayDate(activity.activity_date)}
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-gray-100 bg-linear-to-br py-24 text-center">
              <div className="mx-auto max-w-3xl px-6">
                <span className="mb-4 inline-block rounded-full bg-rose-100 px-3 py-1 text-xs font-medium text-rose-700">
                  {activity.category}
                </span>
                <h1 className="text-4xl leading-[1.15] font-bold tracking-tight text-[#1d1d1f] md:text-5xl">
                  {activity.title}
                </h1>
                <p className="mt-4 text-sm text-[#6e6e73]">
                  {displayDate(activity.activity_date)}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="mx-auto max-w-3xl px-6 py-16">
          {/* ─── Description ─── */}
          <section>
            <p className="mb-6 text-[11px] font-medium tracking-[0.22em] text-[#6e6e73] uppercase">
              รายละเอียดกิจกรรม
            </p>
            <div className="space-y-5 text-[15px] leading-[1.85] text-[#1d1d1f]">
              {activity.description.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </section>

          <hr className="my-14 border-black/6" />

          {/* ─── Photo gallery ─── */}
          <section>
            <div className="mb-8 flex items-end justify-between">
              <div>
                <p className="mb-1 text-[11px] font-medium tracking-[0.22em] text-[#6e6e73] uppercase">
                  รูปภาพกิจกรรม
                </p>
                <p className="text-2xl font-bold tracking-tight text-[#1d1d1f]">
                  {activity.activity_images.length} รูป
                </p>
              </div>
              <p className="text-[12px] text-[#6e6e73]">กดรูปเพื่อดูเต็มจอ</p>
            </div>
            <PhotoGallery images={activity.activity_images} />
          </section>

          {/* ─── Back link ─── */}
          <div className="mt-16">
            <Link
              href="/activities"
              className="inline-flex items-center gap-2 text-sm text-[#6e6e73] transition-colors hover:text-[#1d1d1f]"
            >
              ← กลับไปหน้ากิจกรรมทั้งหมด
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
