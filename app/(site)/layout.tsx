import SiteNav from "@/components/SiteNav";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteNav />
      {children}
      <footer className="border-t border-black/6 bg-white py-6 text-center text-xs text-zinc-400">
        © thungmon 2026
      </footer>
    </>
  );
}
