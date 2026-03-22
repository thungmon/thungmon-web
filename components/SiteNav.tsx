"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/activities", label: "กิจกรรม" },
  { href: "/links", label: "ช่องทางติดตาม" },
];

export default function SiteNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-black/6 bg-white/80 backdrop-blur-2xl">
      <nav className="mx-auto flex h-14 max-w-6xl items-center gap-6 px-6">
        {/* Brand */}
        <Link
          href="/"
          className="shrink-0 font-semibold text-zinc-900 transition-colors hover:text-zinc-600"
        >
          บ้านทุ่งมน
        </Link>

        {/* Divider */}
        <span className="h-4 w-px shrink-0 bg-black/10" />

        {/* Nav links */}
        <div className="flex items-center gap-1">
          {NAV_ITEMS.map(({ href, label }) => {
            const isActive = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`rounded-full px-3 py-1.5 text-sm transition-colors ${
                  isActive
                    ? "bg-zinc-100 font-medium text-zinc-900"
                    : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
