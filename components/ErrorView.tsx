import Link from "next/link";

interface ErrorViewProps {
  /** Error card title – defaults to "โหลดข้อมูลไม่สำเร็จ" */
  title?: string;
  /** Error card description message */
  message?: string;
  /** Back-button href – defaults to "/" */
  backHref?: string;
  /** Back-button label – defaults to "← กลับหน้าหลัก" */
  backLabel?: string;
}

export default function ErrorView({
  title = "โหลดข้อมูลไม่สำเร็จ",
  message,
  backHref = "/",
  backLabel = "← กลับหน้าหลัก",
}: ErrorViewProps) {
  return (
    <main className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center bg-neutral-100 px-6">
      <div className="w-full max-w-md rounded-3xl bg-white p-12 text-center shadow-sm">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50">
          <svg
            className="h-8 w-8 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
            />
          </svg>
        </div>
        <h2 className="text-xl font-semibold tracking-tight text-zinc-900">
          {title}
        </h2>
        {message && (
          <p className="mt-2 text-sm leading-relaxed text-zinc-500">
            {message}
          </p>
        )}
        <Link
          href={backHref}
          className="mt-8 inline-flex items-center gap-1.5 rounded-full bg-zinc-900 px-5 py-2.5 text-[13px] font-medium text-white transition-opacity hover:opacity-80"
        >
          {backLabel}
        </Link>
      </div>
    </main>
  );
}
