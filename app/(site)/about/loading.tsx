export default function AboutLoading() {
  return (
    <main className="bg-neutral-100">
      {/* Header skeleton */}
      <div className="border-b border-black/6 bg-white py-20 text-center">
        <div className="mx-auto mb-3 h-3 w-24 animate-pulse rounded-full bg-zinc-200" />
        <div className="mx-auto h-10 w-36 animate-pulse rounded-full bg-zinc-200" />
        <div className="mx-auto mt-4 h-4 w-56 animate-pulse rounded-full bg-zinc-200" />
      </div>

      {/* Map section skeleton */}
      <div className="mx-auto max-w-4xl px-6 py-14">
        <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
          <div className="border-b border-black/6 px-8 py-6">
            <div className="h-5 w-28 animate-pulse rounded-full bg-zinc-200" />
            <div className="mt-2 h-4 w-36 animate-pulse rounded-full bg-zinc-200" />
          </div>
          <div className="aspect-video w-full animate-pulse bg-zinc-200" />
        </div>
      </div>
    </main>
  );
}
