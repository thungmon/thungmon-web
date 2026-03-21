import type { Metadata, Viewport } from "next";
import { Sarabun } from "next/font/google";
import "./globals.css";
import "dayjs/locale/th";

const sarabun = Sarabun({
  variable: "--font-sarabun",
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: {
    template: "%s | บ้านทุ่งมน",
    default: "บ้านทุ่งมน | ตำบลทุ่งมน อำเภอคำเขื่อนแก้ว จังหวัดยโสธร",
  },
  description:
    "บ้านทุ่งมน ตำบลทุ่งมน อำเภอคำเขื่อนแก้ว จังหวัดยโสธร ดินแดนแห่งข้าวหอมมะลิและวัฒนธรรมอีสานอันงดงาม",
  openGraph: {
    siteName: "บ้านทุ่งมน",
    locale: "th_TH",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="th"
      className={`${sarabun.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
