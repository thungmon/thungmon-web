export default function AboutPage() {
  return (
    <main className="min-h-screen bg-neutral-100">
      {/* ─── Page header ─── */}
      <div className="border-b border-black/6 bg-white py-20 text-center">
        <p className="mb-3 text-xs font-medium tracking-[0.22em] text-zinc-500 uppercase">
          ชุมชนบ้านทุ่งมน
        </p>
        <h1 className="text-5xl font-bold tracking-tight text-zinc-900">
          เกี่ยวกับเรา
        </h1>
        <p className="mt-4 text-base text-zinc-500">
          รู้จักชุมชนบ้านทุ่งมนและที่ตั้งของเรา
        </p>
      </div>

      {/* ─── Map section ─── */}
      <div className="mx-auto max-w-4xl px-6 py-14">
        <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
          <div className="border-b border-black/6 px-8 py-6">
            <h2 className="text-xl font-semibold text-zinc-900">
              ที่ตั้งชุมชน
            </h2>
            <p className="mt-1 text-sm text-zinc-500">ชุมชนบ้านทุ่งมน</p>
          </div>
          <div className="aspect-video w-full">
            <iframe
              src="https://maps.google.com/maps?q=15.741593715244704,104.29906658872281&z=15&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="ที่ตั้งชุมชนบ้านทุ่งมน"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
