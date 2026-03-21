import type { Metadata } from "next";
import { Sarabun } from "next/font/google";
import "./globals.css";

const sarabun = Sarabun({
  variable: "--font-sarabun",
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "บ้านทุ่งมน | ตำบลทุ่งมน อำเภอคำเขื่อนแก้ว จังหวัดยโสธร",
  description:
    "บ้านทุ่งมน ตำบลทุ่งมน อำเภอคำเขื่อนแก้ว จังหวัดยโสธร ดินแดนแห่งข้าวหอมมะลิและวัฒนธรรมอีสานอันงดงาม",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={`${sarabun.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
