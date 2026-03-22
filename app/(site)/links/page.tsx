import { supabase } from "@/lib/supabase";
import type { Metadata } from "next";
import ErrorView from "@/components/ErrorView";
import CommunityLinkCard from "@/components/CommunityLinkCard";

export const metadata: Metadata = {
  title: "ช่องทางติดตาม",
  description: "รวมทุกช่องทางที่เชื่อมต่อกับชุมชนบ้านทุ่งมน",
  openGraph: {
    title: "ช่องทางติดตาม | บ้านทุ่งมน",
    description: "รวมทุกช่องทางที่เชื่อมต่อกับชุมชนบ้านทุ่งมน",
    url: "/links",
    type: "website",
    locale: "th_TH",
  },
  twitter: {
    card: "summary",
    title: "ช่องทางติดตาม | บ้านทุ่งมน",
    description: "รวมทุกช่องทางที่เชื่อมต่อกับชุมชนบ้านทุ่งมน",
  },
  alternates: { canonical: "/links" },
};

export const revalidate = 0;

export default async function LinksPage() {
  const { data: communityLinks, error } = await supabase
    .from("community_links")
    .select()
    .order("sort_order");

  if (error) {
    return (
      <ErrorView message="เกิดข้อผิดพลาดในการโหลดช่องทางติดตาม กรุณาลองใหม่อีกครั้ง" />
    );
  }

  return (
    <>
      <main className="bg-neutral-100">
        {/* ─── Page header ─── */}
        <div className="border-b border-black/6 bg-white py-20 text-center">
          <p className="mb-3 text-xs font-medium tracking-[0.22em] text-zinc-500 uppercase">
            ชุมชนบ้านทุ่งมน
          </p>
          <h1 className="text-5xl font-bold tracking-tight text-zinc-900">
            ช่องทางติดตาม
          </h1>
          <p className="mt-4 text-base text-zinc-500">
            รวมทุกช่องทางที่เชื่อมต่อกับชุมชนบ้านทุ่งมน
          </p>
        </div>

        {communityLinks.length === 0 && (
          <div className="mx-auto max-w-5xl px-6 py-14">
            <div className="rounded-3xl bg-white p-16 text-center">
              <p className="text-zinc-500">ยังไม่มีข้อมูลช่องทาง</p>
            </div>
          </div>
        )}

        {/* ─── Content ─── */}
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 px-6 py-14 sm:grid-cols-2">
          {communityLinks.map((l) => (
            <CommunityLinkCard key={l.id} link={l} />
          ))}
        </div>
      </main>
    </>
  );
}
