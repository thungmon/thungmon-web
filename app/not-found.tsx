import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-neutral-100 px-6 text-center">
      <p className="text-8xl font-bold text-zinc-200">404</p>
      <h1 className="mt-4 text-2xl font-bold text-zinc-900">
        ไม่พบหน้าที่ต้องการ
      </h1>
      <p className="mt-2 text-base text-zinc-500">
        หน้าที่คุณกำลังมองหาอาจถูกลบ ย้าย หรือไม่มีอยู่
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-zinc-900 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-700"
      >
        กลับหน้าหลัก
      </Link>
    </main>
  );
}
