export default function SiteLoading() {
  return (
    <div className="flex flex-1 items-center justify-center bg-neutral-100">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-700" />
        <p className="text-sm text-zinc-400">กำลังโหลด...</p>
      </div>
    </div>
  );
}
