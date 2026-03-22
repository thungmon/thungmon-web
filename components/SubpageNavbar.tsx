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
    <header className="border-b border-black/6 bg-white">
      <nav className="mx-auto flex h-10 max-w-6xl items-center gap-2 px-6 text-xs text-zinc-500">
        <Link
          href="/"
          className="shrink-0 text-zinc-500 transition-colors hover:text-zinc-900"
        >
          บ้านทุ่งมน
        </Link>
        {breadcrumbs.map((item, i) => (
          <Fragment key={i}>
            <span className="shrink-0 text-zinc-500/40">/</span>
            {item.href ? (
              <Link
                href={item.href}
                className="shrink-0 transition-colors hover:text-zinc-900"
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
