"use client";

import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({
  currentPage,
  totalPages,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = buildPageRange(currentPage, totalPages);

  return (
    <nav
      aria-label="การแบ่งหน้า"
      className="mt-12 flex items-center justify-center gap-1"
    >
      {/* Previous */}
      <PagerLink
        href={pageHref(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="หน้าก่อนหน้า"
      >
        ←
      </PagerLink>

      {/* Page numbers */}
      {pages.map((p, i) =>
        p === "…" ? (
          <span
            key={`ellipsis-${i}`}
            className="flex h-9 w-9 items-center justify-center text-sm text-zinc-500"
          >
            …
          </span>
        ) : (
          <PagerLink
            key={p}
            href={pageHref(p as number)}
            active={p === currentPage}
            aria-label={`หน้า ${p}`}
            aria-current={p === currentPage ? "page" : undefined}
          >
            {p}
          </PagerLink>
        ),
      )}

      {/* Next */}
      <PagerLink
        href={pageHref(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="หน้าถัดไป"
      >
        →
      </PagerLink>
    </nav>
  );
}

// ─── helpers ──────────────────────────────────────────────────────────────────

function pageHref(page: number) {
  return page === 1 ? "/activities" : `/activities?page=${page}`;
}

interface PagerLinkProps {
  href: string;
  disabled?: boolean;
  active?: boolean;
  children: React.ReactNode;
  "aria-label"?: string;
  "aria-current"?: "page" | undefined;
}

function PagerLink({
  href,
  disabled,
  active,
  children,
  "aria-label": ariaLabel,
  "aria-current": ariaCurrent,
}: PagerLinkProps) {
  const base =
    "flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium transition-colors";

  if (disabled) {
    return (
      <span
        aria-disabled="true"
        className={`${base} cursor-not-allowed text-zinc-300`}
      >
        {children}
      </span>
    );
  }

  if (active) {
    return (
      <span
        aria-current={ariaCurrent}
        className={`${base} bg-zinc-900 text-white`}
      >
        {children}
      </span>
    );
  }

  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      aria-current={ariaCurrent}
      className={`${base} text-zinc-900 hover:bg-black/5`}
    >
      {children}
    </Link>
  );
}

/** Returns a compact page range with ellipses, e.g. [1, "…", 4, 5, 6, "…", 10] */
function buildPageRange(current: number, total: number): (number | "…")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | "…")[] = [1];

  const rangeStart = Math.max(2, current - 1);
  const rangeEnd = Math.min(total - 1, current + 1);

  if (rangeStart > 2) pages.push("…");
  for (let i = rangeStart; i <= rangeEnd; i++) pages.push(i);
  if (rangeEnd < total - 1) pages.push("…");

  pages.push(total);
  return pages;
}
