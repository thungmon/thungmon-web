import type { Metadata } from "next";
import Link from "next/link";
import SubpageNavbar from "@/components/SubpageNavbar";
import { PhotoGallery, type ActivityImage } from "@/components/PhotoGallery";
import { supabase } from "@/lib/supabase";
import { redirect } from "next/navigation";

// cache for 5 minutes
export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const { data: place } = await supabase
    .from("places")
    .select("title, excerpt, cover_image, category, slug")
    .eq("slug", decodeURIComponent(slug))
    .single();

  if (!place) return {};

  const title = place.title;
  const description = place.excerpt;
  const url = `/places/${place.slug}`;
  const images = place.cover_image
    ? [{ url: place.cover_image, width: 1200, height: 630, alt: title }]
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
      tags: [place.category, "บ้านทุ่งมน", "ทุ่งมน", "ยโสธร"],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | บ้านทุ่งมน`,
      description,
      images: place.cover_image ? [place.cover_image] : undefined,
    },
    alternates: { canonical: url },
  };
}

export default async function PlaceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: place, error } = await supabase
    .from("places")
    .select()
    .eq("slug", decodeURIComponent(slug))
    .eq("is_public", true)
    .single();

  if (error || !place) {
    return redirect("/places");
  }

  const lat = place.latitude;
  const lon = place.longitude;
  const googleMapsEmbedUrl = `https://maps.google.com/maps?q=${lat},${lon}&z=15&output=embed`;
  const googleMapsUrl = `https://www.google.com/maps?q=${lat},${lon}`;

  const images: ActivityImage[] = [];
  if (place.bucket_name) {
    const { data: files } = await supabase.storage
      .from("places")
      .list(place.bucket_name, {
        limit: 500,
        offset: 0,
        sortBy: { column: "name", order: "asc" },
      });

    if (files) {
      for (const f of files) {
        if (f.name === ".emptyFolderPlaceholder") continue;
        const { data } = supabase.storage
          .from("places")
          .getPublicUrl(`${place.bucket_name}/${f.name}`);
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
          { label: "สถานที่น่าสนใจ", href: "/places" },
          { label: place.title },
        ]}
      />
      <main className="bg-white">
        {/* ─── Hero ─── */}
        {place.cover_image ? (
          <div className="relative h-[50vh] min-h-64 overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-br" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={place.cover_image}
              alt={place.title}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute right-0 bottom-0 left-0 px-6 pb-10 text-center">
              <span className="mb-4 inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
                {place.category}
              </span>
              <h1 className="mt-2 text-4xl leading-[1.15] font-bold tracking-tight text-white md:text-5xl">
                {place.title}
              </h1>
            </div>
          </div>
        ) : (
          <div className="border-b border-black/6 bg-white py-16 text-center">
            <span className="mb-4 inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
              {place.category}
            </span>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-zinc-900">
              {place.title}
            </h1>
          </div>
        )}

        {/* ─── Content + Map ─── */}
        <div className="mx-auto max-w-3xl space-y-12 px-6 py-14">
          {/* Description */}
          <section>
            <p className="mb-1 text-xs font-medium tracking-[0.22em] text-zinc-500 uppercase">
              รายละเอียด
            </p>
            <div className="mt-3 space-y-5 text-base leading-[1.85] text-zinc-900">
              {place.description.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </section>

          {/* ─── Photo gallery ─── */}
          {images.length > 0 && (
            <>
              <hr className="border-black/6" />
              <section>
                <div className="mb-8 flex items-end justify-between">
                  <div>
                    <p className="mb-1 text-xs font-medium tracking-[0.22em] text-zinc-500 uppercase">
                      รูปภาพ
                    </p>
                    <p className="text-2xl font-bold tracking-tight text-zinc-900">
                      {images.length} รูป
                    </p>
                  </div>
                  <p className="text-xs text-zinc-500">กดรูปเพื่อดูเต็มจอ</p>
                </div>
                <PhotoGallery images={images} />
              </section>
            </>
          )}

          {/* Map */}
          <hr className="border-black/6" />
          <section>
            <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-zinc-900">
              <svg
                className="h-5 w-5 text-emerald-600"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                />
              </svg>
              แผนที่
            </h2>

            {/* Embedded map */}
            <div className="overflow-hidden rounded-2xl border border-black/6 shadow-sm">
              <iframe
                title={`แผนที่ ${place.title}`}
                src={googleMapsEmbedUrl}
                width="100%"
                height="400"
                className="block w-full"
                loading="lazy"
                referrerPolicy="no-referrer"
                allowFullScreen
              />
            </div>

            {/* Coordinates + open link */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-zinc-500">
                พิกัด:{" "}
                <span className="font-mono text-zinc-700">
                  {lat}, {lon}
                </span>
              </p>
              <div className="flex gap-2">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-full bg-zinc-100 px-4 py-2 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-200"
                >
                  <svg
                    className="h-3.5 w-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                    />
                  </svg>
                  เปิดใน Google Maps
                </a>
              </div>
            </div>
          </section>

          {/* ─── Back link ─── */}
          <div className="mt-16">
            <Link
              href="/places"
              className="inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-zinc-900"
            >
              ← กลับไปหน้าสถานที่ทั้งหมด
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
