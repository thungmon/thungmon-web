import Link from "next/link";
import { displayDate } from "@/lib/date";

interface NewsCardProps {
  id: string;
  slug: string;
  title: string;
  news_date: string;
  category: string;
  excerpt: string;
}

export default function NewsCard({
  slug,
  title,
  news_date,
  category,
  excerpt,
}: NewsCardProps) {
  return (
    <Link
      href={`/news/${slug}`}
      className="group flex overflow-hidden rounded-md bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl"
    >
      {/* Content */}
      <div className="flex min-w-0 flex-col justify-center px-5 py-4">
        {/* Title */}
        <h2 className="mb-1.5 text-base leading-snug font-bold text-zinc-900 underline decoration-zinc-900/0 underline-offset-2 transition-all group-hover:decoration-zinc-900/20">
          {title}
        </h2>

        {/* Excerpt */}
        <p className="line-clamp-2 text-sm leading-relaxed text-zinc-500">
          {excerpt}
          {excerpt}
          {excerpt}
          {excerpt}
          {excerpt}
          {excerpt}
          {excerpt}
        </p>

        {/* Meta row */}
        <div className="my-2 flex flex-wrap items-center justify-between gap-2">
          <span className="rounded-full bg-sky-100 px-2.5 py-0.5 text-xs font-medium text-sky-700">
            {category}
          </span>
          <span className="text-xs text-zinc-500">
            {displayDate(news_date)}
          </span>
        </div>
      </div>
    </Link>
  );
}
