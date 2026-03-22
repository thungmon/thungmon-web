// ─── Page header skeleton ──────────────────────────────────────────────────────
function HeaderSkeleton() {
  return (
    <div className="border-b border-black/6 bg-white py-20 text-center">
      <div className="mx-auto mb-3 h-3 w-24 animate-pulse rounded-full bg-zinc-200" />
      <div className="mx-auto h-10 w-44 animate-pulse rounded-full bg-zinc-200" />
      <div className="mx-auto mt-4 h-4 w-64 animate-pulse rounded-full bg-zinc-200" />
    </div>
  );
}

// ─── Link card skeleton ────────────────────────────────────────────────────────
function LinkCardSkeleton() {
  return (
    <div className="flex items-start gap-4 rounded-2xl bg-white p-5 shadow-sm">
      <div className="mt-0.5 h-11 w-11 shrink-0 animate-pulse rounded-xl bg-zinc-200" />
      <div className="flex-1 space-y-2">
        <div className="h-4 w-32 animate-pulse rounded-full bg-zinc-200" />
        <div className="h-3 w-16 animate-pulse rounded-full bg-zinc-200" />
        <div className="h-3 w-full animate-pulse rounded-full bg-zinc-200" />
        <div className="h-3 w-24 animate-pulse rounded-full bg-zinc-200" />
      </div>
    </div>
  );
}

export default function LinksLoading() {
  return (
    <main className="bg-neutral-100">
      <HeaderSkeleton />
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 px-6 py-14 sm:grid-cols-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <LinkCardSkeleton key={i} />
        ))}
      </div>
    </main>
  );
}
