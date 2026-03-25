export default function CalendarLoading() {
  return (
    <main className="bg-neutral-100">
      {/* ── Page header skeleton ── */}
      <div className="border-b border-black/6 bg-white py-20 text-center">
        <div className="mx-auto mb-3 h-3 w-32 animate-pulse rounded-full bg-zinc-200" />
        <div className="mx-auto h-12 w-40 animate-pulse rounded-xl bg-zinc-200" />
        <div className="mx-auto mt-4 h-4 w-64 animate-pulse rounded-full bg-zinc-200" />
      </div>

      <div className="mx-auto max-w-4xl px-6 py-14">
        {/* Month nav skeleton */}
        <div className="mb-6 flex items-center justify-between">
          <div className="h-9 w-24 animate-pulse rounded-lg bg-zinc-200" />
          <div className="h-7 w-40 animate-pulse rounded-lg bg-zinc-200" />
          <div className="h-9 w-24 animate-pulse rounded-lg bg-zinc-200" />
        </div>

        {/* Legend skeleton */}
        <div className="mb-5 flex gap-6">
          <div className="h-4 w-20 animate-pulse rounded-full bg-zinc-200" />
          <div className="h-4 w-20 animate-pulse rounded-full bg-zinc-200" />
        </div>

        {/* Calendar grid skeleton */}
        <div className="overflow-hidden rounded-2xl border border-black/6 bg-white shadow-sm">
          <div className="grid grid-cols-7 border-b border-black/6">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="flex justify-center py-3">
                <div className="h-3 w-6 animate-pulse rounded-full bg-zinc-100" />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 divide-x divide-y divide-black/4">
            {Array.from({ length: 35 }).map((_, i) => (
              <div key={i} className="min-h-18 p-2 sm:min-h-22 sm:p-3">
                <div className="h-7 w-7 animate-pulse rounded-full bg-zinc-100" />
              </div>
            ))}
          </div>
        </div>

        {/* Events list skeleton */}
        <div className="mt-10 space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-16 animate-pulse rounded-xl bg-white"
              style={{ opacity: 1 - i * 0.2 }}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
