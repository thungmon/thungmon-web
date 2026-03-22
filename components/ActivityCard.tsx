import Link from "next/link";
import ActivityCardImage from "@/components/ActivityCardImage";
import { displayDate } from "@/lib/date";
import dayjs from "dayjs";

interface ActivityCardProps {
  id: string;
  slug: string;
  title: string;
  activity_date: string;
  cover_image: string;
  category: string;
  excerpt: string | null;
}

export default function ActivityCard({
  slug,
  title,
  activity_date,
  cover_image,
  category,
  excerpt,
}: ActivityCardProps) {
  return (
    <Link
      href={`/activities/${slug}`}
      className="group block overflow-hidden rounded-3xl bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl"
    >
      {/* Cover */}
      <div className="relative aspect-video overflow-hidden">
        <ActivityCardImage src={cover_image} alt={title} />
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Meta row */}
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-rose-100 px-2.5 py-1 text-xs font-medium text-rose-700">
            {category}
          </span>
          {dayjs(activity_date).isAfter(dayjs()) && (
            <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-700">
              กำลังจะมาถึง
            </span>
          )}
          <span className="text-xs text-zinc-500">
            {displayDate(activity_date)}
          </span>
        </div>

        {/* Title */}
        <h2 className="mb-2 text-base leading-snug font-bold text-zinc-900 underline decoration-zinc-900/0 underline-offset-2 transition-all group-hover:decoration-zinc-900/20">
          {title}
        </h2>

        {/* Excerpt */}
        <p className="line-clamp-2 text-sm leading-relaxed text-zinc-500">
          {excerpt}
        </p>

        {/* Arrow CTA */}
        <div className="mt-5 flex items-center gap-1 text-sm font-medium text-zinc-900">
          ดูรายละเอียด
          <span className="transition-transform duration-200 group-hover:translate-x-1">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}
