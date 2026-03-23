import type { Metadata } from "next";
import { headers } from "next/headers";
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

  const { data: item } = await supabase
    .from("news")
    .select()
    .eq("slug", decodeURIComponent(slug))
    .single();

  if (!item) return {};

  const title = item.title;
  const description = item.excerpt;
  const url = `/news/${item.slug}`;

  return {
    title,
    description,
    openGraph: {
      title: `${title} | บ้านทุ่งมน`,
      description,
      url,
      type: "article",
      locale: "th_TH",
      publishedTime: item.news_date,
      tags: [item.category, "บ้านทุ่งมน", "ทุ่งมน", "ยโสธร"],
    },
    twitter: {
      card: "summary",
      title: `${title} | บ้านทุ่งมน`,
      description,
    },
    alternates: { canonical: url },
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: item, error } = await supabase
    .from("news")
    .select()
    .eq("slug", decodeURIComponent(slug))
    .eq("is_public", true)
    .single();

  if (error || !item) {
    return redirect("/news");
  }

  const hdrs = await headers();
  const host = hdrs.get("host") ?? "";
  const proto = (hdrs.get("x-forwarded-proto") ?? "https").split(",")[0].trim();
  const ua = hdrs.get("user-agent") ?? "";
  const isMobile = /android|iphone|ipad|ipod|mobile/i.test(ua);
  const pageUrl = `${proto}://${host}/news/${item.slug}`;
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`;
  const messengerShareUrl = `fb-messenger://share/?link=${encodeURIComponent(pageUrl)}`;
  const lineShareUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(pageUrl)}`;

  return (
    <>
      <SubpageNavbar
        breadcrumbs={[
          { label: "ข่าวสาร", href: "/news" },
          { label: item.title },
        ]}
      />
      <main className="bg-white">
        {/* ─── Hero ─── */}
        <div className="relative">
          <div className="bg-gray-100 py-24 text-center">
            <div className="mx-auto max-w-3xl px-6">
              {item.category && (
                <span className="mb-4 inline-block rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-700">
                  {item.category}
                </span>
              )}
              <h1 className="text-4xl leading-[1.15] font-bold tracking-tight text-zinc-900 md:text-5xl">
                {item.title}
              </h1>
              <p className="mt-4 text-sm text-zinc-500">
                {displayDate(item.news_date)}
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-3xl px-6 py-16">
          {/* ─── Share buttons ─── */}
          <div className="mb-10 flex items-center justify-end gap-3">
            {isMobile ? (
              <>
                <a
                  href={messengerShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#0099FF] text-white transition-opacity hover:opacity-90"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <path d="M12 0C5.374 0 0 4.975 0 11.111c0 3.497 1.745 6.616 4.472 8.652V24l4.086-2.242c1.09.301 2.246.464 3.442.464 6.626 0 12-4.974 12-11.111C24 4.975 18.626 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26L10.732 8l3.131 3.259L19.752 8l-6.561 6.963z" />
                  </svg>
                </a>
                <a
                  href={lineShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#06C755] text-white transition-opacity hover:opacity-90"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <path d="M19.952 12.854c0-3.954-3.962-7.172-8.83-7.172-4.868 0-8.831 3.218-8.831 7.172 0 3.546 3.143 6.516 7.389 7.079.288.062.68.19.779.436.09.224.059.574.029.8l-.126.757c-.038.224-.178.877.77.478.946-.399 5.108-3.009 6.97-5.151 1.285-1.41 1.85-2.843 1.85-4.399z" />
                  </svg>
                </a>
              </>
            ) : (
              <a
                href={facebookShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#1877F2] text-white transition-opacity hover:opacity-90"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <path d="M24 12.073C24 5.406 18.627 0 12 0S0 5.406 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.532-4.697 1.313 0 2.686.236 2.686.236v2.97h-1.514c-1.491 0-1.956.93-1.956 1.887v2.256h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
                </svg>
              </a>
            )}
          </div>

          {/* ─── Content ─── */}
          <article
            className="prose prose-zinc max-w-none"
            dangerouslySetInnerHTML={{ __html: item.content }}
          />
        </div>
      </main>
    </>
  );
}
