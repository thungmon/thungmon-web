import { Fragment } from "react";
import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface SubpageNavbarProps {
  breadcrumbs: BreadcrumbItem[];
}

export default function SubpageNavbar({ breadcrumbs }: SubpageNavbarProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-black/6 bg-white/80 backdrop-blur-2xl">
      <nav className="mx-auto flex h-14 max-w-6xl items-center gap-2 px-6 text-sm">
        <Link
          href="/"
          className="shrink-0 text-zinc-500 transition-colors hover:text-zinc-900"
        >
          ← บ้านทุ่งมน
        </Link>
        {breadcrumbs.map((item, i) => (
          <Fragment key={i}>
            <span className="shrink-0 text-zinc-500/40">/</span>
            {item.href ? (
              <Link
                href={item.href}
                className="shrink-0 text-zinc-500 transition-colors hover:text-zinc-900"
              >
                {item.label}
              </Link>
            ) : (
              <span className="max-w-50 truncate font-medium text-zinc-900">
                {item.label}
              </span>
            )}
          </Fragment>
        ))}
      </nav>
    </header>
  );
}
