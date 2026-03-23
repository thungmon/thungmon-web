# บ้านทุ่งมน · thungmon-web

เว็บไซต์ชุมชนตำบลทุ่งมน อำเภอคำเขื่อนแก้ว จังหวัดยโสธร — ดินแดนข้าวหอมมะลิและวัฒนธรรมอีสานอันงดงาม

> **A community website for Ban Thung Mon**, Kham Khuean Kaeo, Yasothon — built with Next.js, Supabase, and Tailwind CSS.

---

## ทำไมถึงอยากชวนคุณมาช่วย?

โปรเจกต์นี้สร้างขึ้นเพื่อคนในชุมชนและคนที่รักทุ่งมน เราอยากให้มันดีขึ้นเรื่อย ๆ ด้วยความช่วยเหลือของทุกคนที่สนใจ ไม่ว่าจะเป็น Developer, Designer, หรือแม้แต่คนที่อยากช่วยเพิ่มข้อมูล ทุก Contribution มีคุณค่าเสมอ

---

## ฟีเจอร์หลัก

| หน้า                 | คำอธิบาย                                                   |
| -------------------- | ---------------------------------------------------------- |
| `/`                  | หน้าแรก — Hero พร้อม background video และ CTA              |
| `/explore`           | สำรวจ — รวมกิจกรรม, สถานที่, และช่องทางติดตามในหน้าเดียว   |
| `/activities`        | กิจกรรม — รายการกิจกรรมชุมชนพร้อม Pagination               |
| `/activities/[slug]` | รายละเอียดกิจกรรม — Gallery ภาพ, แชร์ไปยัง Facebook / LINE |
| `/places`            | สถานที่น่าสนใจ — รายการสถานที่พร้อม Pagination             |
| `/places/[slug]`     | รายละเอียดสถานที่ — แผนที่ Google Maps, Gallery ภาพ        |
| `/links`             | ช่องทางติดตาม — รวม Social Media และช่องทางชุมชน           |
| `/about`             | เกี่ยวกับเรา — ข้อมูลชุมชนและแผนที่หมู่บ้าน                |

---

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Frontend:** React 19, TypeScript 5
- **Styling:** Tailwind CSS v4
- **Backend / Database:** [Supabase](https://supabase.com/) (PostgreSQL + Storage)
- **Date:** day.js พร้อม Thai locale และปีพุทธศักราช
- **Deployment:** Vercel

---

## เริ่มต้นพัฒนาในเครื่องของคุณ

### 1. Clone โปรเจกต์

```bash
git clone https://github.com/YOUR_ORG/thungmon-web.git
cd thungmon-web
```

### 2. ติดตั้ง Dependencies

```bash
npm install
```

### 3. ตั้งค่า Environment Variables

สร้างไฟล์ `.env.local` ที่ root ของโปรเจกต์:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

> ติดต่อทีมเพื่อขอ credentials สำหรับ Development หรือสร้าง Supabase project ของตัวเองได้เลย

### 4. รัน Development Server

```bash
npm run dev
```

เปิด [http://localhost:3000](http://localhost:3000) ในเบราว์เซอร์

---

## โครงสร้างโปรเจกต์

```
app/
  (site)/          # Layout หลักของเว็บไซต์ (Navbar + Footer)
    activities/    # หน้ากิจกรรม
    places/        # หน้าสถานที่
    explore/       # หน้าสำรวจ
    links/         # หน้าช่องทางติดตาม
    about/         # หน้าเกี่ยวกับเรา
components/        # Reusable UI Components
constants/         # Config และค่าคงที่
lib/               # Supabase client, date utilities
scripts/           # สคริปต์สำหรับ generate Supabase types
database.types.ts  # TypeScript types จาก Supabase (auto-generated)
```

### อัพเดต Database Types

เมื่อมีการเปลี่ยนแปลง Schema ใน Supabase ให้ regenerate types ด้วย:

```bash
npx supabase gen types typescript --project-id "czlzktstialnxrfmbstd" --schema public > database.types.ts
```

---

## อยากช่วยพัฒนา? มาเลย!

เราดีใจมากถ้ามีคนสนใจมาช่วยกัน ไม่ว่าจะเป็น:

- 🐛 **แจ้ง Bug** — เปิด Issue บอกว่าเจอปัญหาอะไร
- ✨ **เสนอฟีเจอร์ใหม่** — มีไอเดียอะไรดี ๆ เปิด Issue พูดคุยกันก่อนได้เลย
- 🎨 **ช่วย Design** — UI/UX ยังมีพื้นที่ให้ปรับปรุงอีกเยอะ
- 💻 **ส่ง Pull Request** — Fork แล้ว PR มาได้เลย
- 📝 **เพิ่มข้อมูลชุมชน** — รู้จักทุ่งมนดี? ช่วยเพิ่มข้อมูลกิจกรรมหรือสถานที่ได้

### ขั้นตอนการส่ง Pull Request

1. Fork โปรเจกต์นี้
2. สร้าง Branch ใหม่: `git checkout -b feature/your-feature-name`
3. Commit การเปลี่ยนแปลง: `git commit -m "feat: add your feature"`
4. Push ขึ้น Fork: `git push origin feature/your-feature-name`
5. เปิด Pull Request มาที่ `main`

---

## Scripts

| Command         | ทำอะไร                  |
| --------------- | ----------------------- |
| `npm run dev`   | รัน Development server  |
| `npm run build` | Build สำหรับ Production |
| `npm run start` | รัน Production server   |
| `npm run lint`  | ตรวจ Lint ด้วย ESLint   |

---

## License

© 2026 thungmon — สงวนลิขสิทธิ์
