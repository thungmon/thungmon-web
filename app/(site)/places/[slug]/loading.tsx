export default function PlaceDetailLoading() {
  return (
    <>
      <div className="h-10 border-b border-black/6 bg-white" />
      <main className="bg-white">
        <div className="relative h-[50vh] min-h-64 animate-pulse bg-zinc-200" />
        <div className="mx-auto max-w-3xl space-y-10 px-6 py-14">
          <div className="space-y-3">
            <div className="h-4 w-full animate-pulse rounded-full bg-zinc-100" />
            <div className="h-4 w-5/6 animate-pulse rounded-full bg-zinc-100" />
            <div className="h-4 w-4/6 animate-pulse rounded-full bg-zinc-100" />
          </div>
          <div>
            <div className="mb-4 h-6 w-24 animate-pulse rounded-full bg-zinc-200" />
            <div className="h-96 animate-pulse rounded-2xl bg-zinc-100" />
          </div>
        </div>
      </main>
    </>
  );
}
