import dayjs from "dayjs";
import { supabase } from "@/lib/supabase";
import type { Metadata } from "next";
import CalendarGrid from "@/components/CalendarGrid";

export const metadata: Metadata = {
  title: "ปฏิทิน",
  description: "ปฏิทินกิจกรรมและข่าวสารของชุมชนบ้านทุ่งมน",
  openGraph: {
    title: "ปฏิทิน | บ้านทุ่งมน",
    description: "ปฏิทินกิจกรรมและข่าวสารของชุมชนบ้านทุ่งมน",
    url: "/calendar",
    type: "website",
    locale: "th_TH",
  },
  twitter: {
    card: "summary",
    title: "ปฏิทิน | บ้านทุ่งมน",
    description: "ปฏิทินกิจกรรมและข่าวสารของชุมชนบ้านทุ่งมน",
  },
  alternates: { canonical: "/calendar" },
};

// cache for 5 minutes
export const revalidate = 300;

export default async function CalendarPage({
  searchParams,
}: {
  searchParams: Promise<{ month?: string }>;
}) {
  const { month: monthParam } = await searchParams;

  // Parse and validate "YYYY-MM" query param; default to current month
  const targetMonth = (() => {
    if (monthParam && /^\d{4}-\d{2}$/.test(monthParam)) {
      const d = dayjs(`${monthParam}-01`);
      if (d.isValid()) return d.startOf("month");
    }
    return dayjs().startOf("month");
  })();

  const startOfMonth = targetMonth.format("YYYY-MM-DD");
  const endOfMonth = targetMonth.endOf("month").format("YYYY-MM-DD");
  const year = targetMonth.year();
  const month = targetMonth.month(); // 0-indexed

  const prevMonthParam = targetMonth.subtract(1, "month").format("YYYY-MM");
  const nextMonthParam = targetMonth.add(1, "month").format("YYYY-MM");

  const [{ data: activities }, { data: news }] = await Promise.all([
    supabase
      .from("activities")
      .select("id, slug, title, activity_date, category")
      .gte("activity_date", startOfMonth)
      .lte("activity_date", endOfMonth)
      .order("activity_date", { ascending: true }),
    supabase
      .from("news")
      .select("id, slug, title, news_date, category")
      .eq("is_public", true)
      .gte("news_date", startOfMonth)
      .lte("news_date", endOfMonth)
      .order("news_date", { ascending: true }),
  ]);

  return (
    <main className="bg-neutral-100">
      {/* ── Page header ── */}
      <div className="border-b border-black/6 bg-white py-20 text-center">
        <p className="mb-3 text-xs font-medium tracking-[0.22em] text-zinc-500 uppercase">
          ชุมชนบ้านทุ่งมน
        </p>
        <h1 className="text-5xl font-bold tracking-tight text-zinc-900">
          ปฏิทิน
        </h1>
        <p className="mt-4 text-base text-zinc-500">
          ปฏิทินกิจกรรมและข่าวสารของชุมชนบ้านทุ่งมน
        </p>
      </div>

      <div className="mx-auto max-w-4xl px-6 py-14">
        <CalendarGrid
          year={year}
          month={month}
          activities={activities ?? []}
          news={news ?? []}
          prevMonthParam={prevMonthParam}
          nextMonthParam={nextMonthParam}
        />
      </div>
    </main>
  );
}
