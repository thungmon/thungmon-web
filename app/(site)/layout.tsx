import SiteNav from "@/components/SiteNav";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteNav />
      <div className="flex flex-1 flex-col">{children}</div>
      <footer className="border-t border-black/6 bg-white py-6 text-center text-xs text-zinc-400">
        © thungmon 2026
      </footer>
    </div>
  );
}
