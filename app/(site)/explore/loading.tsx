// ─── Shared skeletons ─────────────────────────────────────────────────────────
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
        <div className="mt-2 h-4 w-24 animate-pulse rounded-full bg-zinc-200" />
      </div>
    </div>
  );
}

function LinkCardSkeleton() {
  return (
    <div className="flex items-start gap-4 rounded-2xl bg-white p-5 shadow-sm">
      <div className="mt-0.5 h-11 w-11 shrink-0 animate-pulse rounded-xl bg-zinc-200" />
      <div className="flex-1 space-y-2">
        <div className="h-4 w-32 animate-pulse rounded-full bg-zinc-200" />
        <div className="h-3 w-16 animate-pulse rounded-full bg-zinc-200" />
        <div className="h-3 w-full animate-pulse rounded-full bg-zinc-200" />
      </div>
    </div>
  );
}

export default function ExploreLoading() {
  return (
    <main className="bg-neutral-100">
      {/* Header skeleton */}
      <div className="border-b border-black/6 bg-white py-20 text-center">
        <div className="mx-auto mb-3 h-3 w-24 animate-pulse rounded-full bg-zinc-200" />
        <div className="mx-auto h-10 w-28 animate-pulse rounded-full bg-zinc-200" />
        <div className="mx-auto mt-4 h-4 w-72 animate-pulse rounded-full bg-zinc-200" />
      </div>

      <div className="mx-auto max-w-6xl space-y-14 px-6 py-14">
        {/* Activities section */}
        <section>
          <div className="mb-6 flex items-center justify-between">
            <div className="h-6 w-32 animate-pulse rounded-full bg-zinc-300" />
            <div className="h-4 w-20 animate-pulse rounded-full bg-zinc-200" />
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <ActivityCardSkeleton key={i} />
            ))}
          </div>
        </section>

        {/* Links section */}
        <section>
          <div className="mb-6 flex items-center justify-between">
            <div className="h-6 w-36 animate-pulse rounded-full bg-zinc-300" />
            <div className="h-4 w-20 animate-pulse rounded-full bg-zinc-200" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <LinkCardSkeleton key={i} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
