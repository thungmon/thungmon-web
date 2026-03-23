// ─── Page header skeleton ──────────────────────────────────────────────────────
function HeaderSkeleton() {
  return (
    <div className="border-b border-black/6 bg-white py-20 text-center">
      <div className="mx-auto mb-3 h-3 w-24 animate-pulse rounded-full bg-zinc-200" />
      <div className="mx-auto h-10 w-32 animate-pulse rounded-full bg-zinc-200" />
      <div className="mx-auto mt-4 h-4 w-72 animate-pulse rounded-full bg-zinc-200" />
    </div>
  );
}

// ─── News card skeleton ────────────────────────────────────────────────────────
function NewsCardSkeleton() {
  return (
    <div className="flex overflow-hidden rounded-3xl bg-white shadow-sm">
      <div
        className="w-36 shrink-0 animate-pulse bg-zinc-200 sm:w-44"
        style={{ minHeight: "7rem" }}
      />
      <div className="flex flex-col justify-center gap-2 px-5 py-4">
        <div className="flex gap-2">
          <div className="h-4 w-16 animate-pulse rounded-full bg-zinc-200" />
          <div className="h-4 w-24 animate-pulse rounded-full bg-zinc-200" />
        </div>
        <div className="h-4 w-3/4 animate-pulse rounded-full bg-zinc-200" />
        <div className="h-3 w-full animate-pulse rounded-full bg-zinc-200" />
        <div className="h-3 w-5/6 animate-pulse rounded-full bg-zinc-200" />
      </div>
    </div>
  );
}

export default function NewsLoading() {
  return (
    <main className="bg-neutral-100">
      <HeaderSkeleton />
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="flex flex-col gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <NewsCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </main>
  );
}
