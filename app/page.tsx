export default function Home() {
  return (
    <>
      <main>
        {/* ─── Hero ────────────────────────────────────────────────── */}
        <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden pt-14">
          {/* Background video */}
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src="/bg-thungmon.mp4"
            autoPlay
            loop
            muted
            playsInline
            style={{
              filter: "brightness(0.6) contrast(1.1) saturate(1.2)",
            }}
          />
          {/* Minimal dark overlay for legibility */}
          <div className="absolute inset-0 bg-black/40" />

          <div className="relative z-10 max-w-5xl px-6 text-center">
            {/* Breadcrumb label */}
            <p className="mb-2 text-sm font-medium text-amber-300/90 uppercase">
              ตำบลทุ่งมน · อำเภอคำเขื่อนแก้ว · จังหวัดยโสธร · ภาคอีสาน
            </p>

            {/* Giant headline */}
            <h1 className="text-6xl font-extrabold text-white sm:text-7xl md:text-8xl">
              บ้านทุ่งมน
            </h1>

            {/* Sub-headline */}
            <p className="mt-7 mb-12 text-lg font-light text-white/75 md:text-xl">
              ชุมชนแห่งผืนนาข้าวหอมมะลิ
              <br className="hidden sm:block" />
              วัฒนธรรมอีสานอันงดงาม และวิถีชีวิตที่อบอุ่นใจ
            </p>

            {/* CTAs */}
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="#about"
                className="rounded-full bg-white px-8 py-3 text-sm font-medium text-black shadow-sm transition-all duration-200 hover:bg-white/80"
              >
                ค้นพบชุมชน
              </a>
              <a
                href="#highlights"
                className="rounded-full border border-white/40 px-8 py-3 text-sm font-medium text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/10"
              >
                ดูไฮไลต์
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
