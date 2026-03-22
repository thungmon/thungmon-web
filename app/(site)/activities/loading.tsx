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

// ─── Activity card skeleton ────────────────────────────────────────────────────
function ActivityCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
      <div className="aspect-video w-full animate-pulse bg-zinc-200" />
      <div className="space-y-3 p-6">
        <div className="flex gap-2">
          <div className="h-5 w-16 animate-pulse rounded-full bg-zinc-200" />
          <div className="h-5 w-20 animate-pulse rounded-full bg-zinc-200" />
        </div>
        <div className="h-5 w-full animate-pulse rounded-full bg-zinc-200" />
        <div className="h-4 w-3/4 animate-pulse rounded-full bg-zinc-200" />
        <div className="h-4 w-1/2 animate-pulse rounded-full bg-zinc-200" />
        <div className="mt-2 h-4 w-24 animate-pulse rounded-full bg-zinc-200" />
      </div>
    </div>
  );
}

export default function ActivitiesLoading() {
  return (
    <main className="bg-neutral-100">
      <HeaderSkeleton />
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <ActivityCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </main>
  );
}
