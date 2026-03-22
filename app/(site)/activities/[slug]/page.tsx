import type { Metadata } from "next";
import Link from "next/link";
import { PhotoGallery, type ActivityImage } from "@/components/PhotoGallery";
import SubpageNavbar from "@/components/SubpageNavbar";
import { supabase } from "@/lib/supabase";
import { displayDate } from "@/lib/date";
import { redirect } from "next/navigation";

// cache for 5 minutes
export const revalidate = 300;

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
    .select()
    .eq("slug", decodeURIComponent(slug))
    .single();

  if (error || !activity) {
    return redirect("/activities");
  }

  const images: ActivityImage[] = [];
  if (activity.bucket_name) {
    const { data: files } = await supabase.storage
      .from("activities")
      .list(activity.bucket_name, {
        limit: 500,
        offset: 0,
        sortBy: { column: "name", order: "asc" },
      });

    if (files) {
      for (const f of files) {
        if (f.name === ".emptyFolderPlaceholder") continue;
        const { data } = supabase.storage
          .from("activities")
          .getPublicUrl(`${activity.bucket_name}/${f.name}`);
        if (data?.publicUrl) {
          images.push({
            id: f.id ?? f.name,
            filename: f.name,
            url: data.publicUrl,
          });
        }
      }
    }
  }

  return (
    <>
      <SubpageNavbar
        breadcrumbs={[
          { label: "กิจกรรม", href: "/activities" },
          { label: activity.title },
        ]}
      />
      <main className="bg-white">
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
                <h1 className="text-4xl leading-[1.15] font-bold tracking-tight text-zinc-900 md:text-5xl">
                  {activity.title}
                </h1>
                <p className="mt-4 text-sm text-zinc-500">
                  {displayDate(activity.activity_date)}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="mx-auto max-w-3xl px-6 py-16">
          {/* ─── Description ─── */}
          <section>
            <p className="mb-6 text-xs font-medium tracking-[0.22em] text-zinc-500 uppercase">
              รายละเอียดกิจกรรม
            </p>
            <div className="space-y-5 text-base leading-[1.85] text-zinc-900">
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
                <p className="mb-1 text-xs font-medium tracking-[0.22em] text-zinc-500 uppercase">
                  รูปภาพกิจกรรม
                </p>
                <p className="text-2xl font-bold tracking-tight text-zinc-900">
                  {images.length} รูป
                </p>
              </div>
              <p className="text-xs text-zinc-500">กดรูปเพื่อดูเต็มจอ</p>
            </div>
            <PhotoGallery images={images} />
          </section>

          {/* ─── Back link ─── */}
          <div className="mt-16">
            <Link
              href="/activities"
              className="inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-zinc-900"
            >
              ← กลับไปหน้ากิจกรรมทั้งหมด
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
