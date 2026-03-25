// import TurnstileGate from "@/components/TurnstileGate";
import SiteNav from "@/components/SiteNav";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const commit = process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) || "";
  return (
    // <TurnstileGate>
    <div className="flex min-h-screen flex-col bg-neutral-100">
      <SiteNav />
      <div className="flex h-full flex-1 flex-col">{children}</div>
      <footer className="border-t border-black/6 bg-white py-4 text-center text-xs text-zinc-400">
        © thungmon 2026 {commit && `(${commit})`}
      </footer>
    </div>
    // </TurnstileGate>
  );
}
