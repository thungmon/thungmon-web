export default function NewsDetailLoading() {
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

        {/* Content paragraphs */}
        <div className="space-y-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className={`h-4 animate-pulse rounded-full bg-zinc-200 ${i % 3 === 2 ? "w-3/4" : "w-full"}`}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
