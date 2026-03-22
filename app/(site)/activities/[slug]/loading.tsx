export default function ActivityDetailLoading() {
  return (
    <main className="bg-white">
      {/* Hero image skeleton */}
      <div className="relative">
        <div className="h-[55vh] min-h-72 w-full animate-pulse bg-zinc-200" />
      </div>

      <div className="mx-auto max-w-3xl px-6 py-16">
        {/* Category + title */}
        <div className="mb-8 space-y-4">
          <div className="h-3 w-20 animate-pulse rounded-full bg-zinc-200" />
          <div className="h-9 w-3/4 animate-pulse rounded-full bg-zinc-200" />
          <div className="h-9 w-1/2 animate-pulse rounded-full bg-zinc-200" />
          <div className="h-4 w-32 animate-pulse rounded-full bg-zinc-200" />
        </div>

        {/* Description paragraphs */}
        <div className="space-y-3">
          <div className="h-4 w-full animate-pulse rounded-full bg-zinc-200" />
          <div className="h-4 w-full animate-pulse rounded-full bg-zinc-200" />
          <div className="h-4 w-5/6 animate-pulse rounded-full bg-zinc-200" />
          <div className="h-4 w-full animate-pulse rounded-full bg-zinc-200" />
          <div className="h-4 w-3/4 animate-pulse rounded-full bg-zinc-200" />
        </div>

        <hr className="my-14 border-black/6" />

        {/* Photo gallery section */}
        <div>
          <div className="mb-8">
            <div className="mb-2 h-3 w-24 animate-pulse rounded-full bg-zinc-200" />
            <div className="h-6 w-36 animate-pulse rounded-full bg-zinc-200" />
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="aspect-4/3 w-full animate-pulse rounded-2xl bg-zinc-200"
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
