import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
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

  const hdrs = await headers();
  const host = hdrs.get("host") ?? "";
  const proto = hdrs.get("x-forwarded-proto") ?? "https";
  const pageUrl = `${proto}://${host}/activities/${activity.slug}`;
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`;
  const lineShareUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(pageUrl)}`;

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
          <div className="mb-10 flex items-center justify-end gap-4">
            <a
              href={facebookShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#1877F2] px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
              </svg>
              แชร์ไปยัง Facebook
            </a>
            <a
              href={lineShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#06C755] px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
              </svg>
              แชร์ไปยัง Line
            </a>
          </div>
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
