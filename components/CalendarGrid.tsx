"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import Link from "next/link";

const DAY_NAMES_TH = ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"];
const MONTH_NAMES_TH = [
  "มกราคม",
  "กุมภาพันธ์",
  "มีนาคม",
  "เมษายน",
  "พฤษภาคม",
  "มิถุนายน",
  "กรกฎาคม",
  "สิงหาคม",
  "กันยายน",
  "ตุลาคม",
  "พฤศจิกายน",
  "ธันวาคม",
];

type CalendarItem = {
  id: string;
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD
  category: string | null;
  type: "activity" | "news";
};

type Props = {
  year: number;
  month: number; // 0-indexed
  activities: Array<{
    id: string;
    slug: string;
    title: string;
    activity_date: string;
    category: string | null;
  }>;
  news: Array<{
    id: string;
    slug: string;
    title: string;
    news_date: string;
    category: string | null;
  }>;
  prevMonthParam: string;
  nextMonthParam: string;
};

function formatThaiDate(dateStr: string): string {
  const d = dayjs(dateStr);
  return `${d.date()} ${MONTH_NAMES_TH[d.month()]} ${d.year() + 543}`;
}

export default function CalendarGrid({
  year,
  month,
  activities,
  news,
  prevMonthParam,
  nextMonthParam,
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  function navigate(monthParam: string) {
    setSelectedDay(null);
    startTransition(() => {
      router.push(`/calendar?month=${monthParam}`);
    });
  }

  // Normalize all events into a unified list sorted by date
  const allItems: CalendarItem[] = [
    ...activities.map((a) => ({
      id: a.id,
      slug: a.slug,
      title: a.title,
      date: a.activity_date,
      category: a.category,
      type: "activity" as const,
    })),
    ...news.map((n) => ({
      id: n.id,
      slug: n.slug,
      title: n.title,
      date: n.news_date,
      category: n.category,
      type: "news" as const,
    })),
  ].sort((a, b) => a.date.localeCompare(b.date));

  // Map: date string -> items for that day
  const itemsByDate = allItems.reduce(
    (acc, item) => {
      acc[item.date] = acc[item.date] ?? [];
      acc[item.date].push(item);
      return acc;
    },
    {} as Record<string, CalendarItem[]>,
  );

  // Build grid cells
  const today = dayjs().format("YYYY-MM-DD");
  const firstDay = dayjs(new Date(year, month, 1));
  const firstDayOfWeek = firstDay.day(); // 0 = Sunday
  const daysInMonth = firstDay.daysInMonth();

  const cells: (number | null)[] = [
    ...Array<null>(firstDayOfWeek).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  // Items to show in the list below
  const displayedItems = selectedDay
    ? (itemsByDate[selectedDay] ?? [])
    : allItems;

  const groupedItems = displayedItems.reduce(
    (acc, item) => {
      acc[item.date] = acc[item.date] ?? [];
      acc[item.date].push(item);
      return acc;
    },
    {} as Record<string, CalendarItem[]>,
  );
  const sortedDates = Object.keys(groupedItems).sort();

  const monthLabel = `${MONTH_NAMES_TH[month]} ${year + 543}`;

  return (
    <div>
      {/* ── Month navigation ── */}
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={() => navigate(prevMonthParam)}
          disabled={isPending}
          className="rounded-lg px-4 py-2 text-sm font-medium text-zinc-600 transition-all hover:bg-white hover:shadow-sm disabled:opacity-40"
        >
          ← ก่อนหน้า
        </button>
        <h2 className="flex items-center gap-2 text-xl font-bold text-zinc-900">
          {monthLabel}
          {isPending && (
            <svg
              className="h-4 w-4 animate-spin text-zinc-400"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
          )}
        </h2>
        <button
          onClick={() => navigate(nextMonthParam)}
          disabled={isPending}
          className="rounded-lg px-4 py-2 text-sm font-medium text-zinc-600 transition-all hover:bg-white hover:shadow-sm disabled:opacity-40"
        >
          ถัดไป →
        </button>
      </div>

      {/* ── Legend ── */}
      <div className="mb-5 flex gap-6 text-xs text-zinc-500">
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-500" />
          กิจกรรม
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-sky-500" />
          ข่าวสาร
        </span>
      </div>

      {/* ── Calendar grid ── */}
      <div className="relative">
        {isPending && (
          <div className="absolute inset-0 z-10 rounded-2xl bg-white/60 backdrop-blur-[2px]" />
        )}
        <div className="overflow-hidden rounded-2xl border border-black/6 bg-white shadow-sm">
          {/* Day-of-week headers */}
          <div className="grid grid-cols-7 border-b border-black/6">
            {DAY_NAMES_TH.map((name, i) => (
              <div
                key={name}
                className={`py-3 text-center text-xs font-semibold tracking-widest ${
                  i === 0
                    ? "text-rose-500"
                    : i === 6
                      ? "text-blue-600"
                      : "text-zinc-400"
                }`}
              >
                {name}
              </div>
            ))}
          </div>

          {/* Day cells */}
          <div className="grid grid-cols-7 divide-x divide-y divide-black/4">
            {cells.map((day, i) => {
              if (day === null) {
                return (
                  <div
                    key={`empty-${i}`}
                    className="min-h-18 bg-neutral-50/60 sm:min-h-22"
                  />
                );
              }

              const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
              const items = itemsByDate[dateStr] ?? [];
              const hasActivity = items.some((it) => it.type === "activity");
              const hasNews = items.some((it) => it.type === "news");
              const isToday = dateStr === today;
              const isSelected = selectedDay === dateStr;
              const col = i % 7; // 0=Sun, 6=Sat

              return (
                <button
                  key={dateStr}
                  onClick={() => setSelectedDay(isSelected ? null : dateStr)}
                  className={`group relative min-h-18 p-2 text-left transition-colors sm:min-h-22 sm:p-3 ${
                    isSelected
                      ? "bg-zinc-900"
                      : isToday
                        ? "bg-zinc-50 ring-1 ring-zinc-200 ring-inset"
                        : "hover:bg-zinc-50"
                  }`}
                >
                  <span
                    className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-sm font-medium ${
                      isSelected
                        ? "bg-white text-zinc-900"
                        : isToday
                          ? "bg-zinc-800 text-white"
                          : col === 0
                            ? "text-rose-500"
                            : col === 6
                              ? "text-blue-600"
                              : "text-zinc-700"
                    }`}
                  >
                    {day}
                  </span>
                  <div className="mt-1.5 flex gap-1">
                    {hasActivity && (
                      <span
                        className={`h-2 w-2 rounded-full ${
                          isSelected ? "bg-rose-300" : "bg-rose-500"
                        }`}
                      />
                    )}
                    {hasNews && (
                      <span
                        className={`h-2 w-2 rounded-full ${
                          isSelected ? "bg-sky-300" : "bg-sky-500"
                        }`}
                      />
                    )}
                  </div>
                  {items.length > 0 && (
                    <p
                      className={`mt-1 hidden text-[11px] sm:block ${
                        isSelected ? "text-zinc-400" : "text-zinc-400"
                      }`}
                    >
                      {items.length} รายการ
                    </p>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Events list ── */}
      <div className="mt-10">
        {selectedDay ? (
          <div className="mb-5 flex items-center gap-3">
            <h3 className="text-lg font-bold text-zinc-900">
              {formatThaiDate(selectedDay)}
            </h3>
            <button
              onClick={() => setSelectedDay(null)}
              className="rounded-full bg-zinc-200 px-3 py-1 text-xs text-zinc-600 transition-colors hover:bg-zinc-300"
            >
              ล้างตัวกรอง ✕
            </button>
          </div>
        ) : (
          allItems.length > 0 && (
            <h3 className="mb-5 text-lg font-bold text-zinc-900">
              รายการทั้งหมดในเดือนนี้
              <span className="ml-2 text-base font-normal text-zinc-400">
                ({allItems.length} รายการ)
              </span>
            </h3>
          )
        )}

        {sortedDates.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-zinc-200 bg-white py-16 text-center">
            <p className="text-sm text-zinc-400">
              {selectedDay
                ? "ไม่มีรายการในวันนี้"
                : "ไม่มีกิจกรรมหรือข่าวสารในเดือนนี้"}
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {sortedDates.map((date) => (
              <div key={date}>
                <p className="mb-3 text-xs font-semibold tracking-wider text-zinc-500 uppercase">
                  {formatThaiDate(date)}
                </p>
                <div className="space-y-2">
                  {groupedItems[date].map((item) => (
                    <Link
                      key={`${item.type}-${item.id}`}
                      href={`/${item.type === "activity" ? "activities" : "news"}/${item.slug}`}
                      className="group flex items-start gap-3 rounded-xl border border-black/6 bg-white px-4 py-3 shadow-sm transition-colors hover:bg-zinc-50"
                    >
                      <span
                        className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${
                          item.type === "activity"
                            ? "bg-rose-500"
                            : "bg-sky-500"
                        }`}
                      />
                      <div className="min-w-0 flex-1">
                        <p className="mb-0.5 text-xs font-medium text-zinc-400">
                          {item.type === "activity" ? "กิจกรรม" : "ข่าวสาร"}
                          {item.category && ` · ${item.category}`}
                        </p>
                        <p className="truncate text-sm font-medium text-zinc-900 group-hover:text-zinc-700">
                          {item.title}
                        </p>
                      </div>
                      <svg
                        className="mt-0.5 h-4 w-4 shrink-0 text-zinc-300 transition-colors group-hover:text-zinc-500"
                        viewBox="0 0 16 16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path
                          d="M6 3l5 5-5 5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
