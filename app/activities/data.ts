// ---------------------------------------------------------------------------
// Mock data — will be replaced by API calls later
// ---------------------------------------------------------------------------

export interface ActivityImage {
  id: string;
  filename: string;
  url: string;
  caption?: string;
}

export interface Activity {
  id: string;
  title: string;
  date: string;
  category: string;
  /** Full Tailwind class string for the category badge */
  categoryStyle: string;
  /** Full Tailwind class string for the cover gradient */
  coverGradient: string;
  /** Optional cover image URL — e.g. the first photo in the activity */
  coverImage?: string;
  excerpt: string;
  /** Paragraphs separated by \n\n */
  description: string;
  images: ActivityImage[];
}

export const ACTIVITIES: Activity[] = [
  {
    id: "bun-bangfai-2568",
    title: "งานบุญบั้งไฟ ประจำปี 2568",
    date: "10 พฤษภาคม 2568",
    category: "ประเพณี",
    categoryStyle: "bg-rose-100 text-rose-700",
    coverGradient: "from-rose-50 to-orange-100",
    coverImage: "/activities/sample-1.jpg",
    excerpt:
      "ประเพณีบุญบั้งไฟประจำปีของบ้านทุ่งมน จัดขึ้นเพื่อขอฝนและความอุดมสมบูรณ์ของผืนนา พร้อมการแสดงหมอลำและกิจกรรมสนุกสนาน",
    description:
      "งานบุญบั้งไฟเป็นประเพณีอันเก่าแก่ของชาวอีสาน จัดขึ้นในช่วงเดือนพฤษภาคมของทุกปี เพื่อขอฝนจากพญาแถนให้ตกต้องตามฤดูกาล ชาวบ้านในบ้านทุ่งมนร่วมแรงร่วมใจกันจัดงานอย่างยิ่งใหญ่ มีขบวนแห่ที่สีสันสดใส การแสดงหมอลำ และกิจกรรมสนุกสนานมากมาย\n\nกิจกรรมในปีนี้มีผู้เข้าร่วมงานจากทั้งในและนอกพื้นที่กว่า 5,000 คน มีการจัดประกวดบั้งไฟสวยงาม การแข่งขันบั้งไฟสูงสุด และการแสดงทางวัฒนธรรมพื้นบ้านตลอดงาน สะท้อนถึงความสามัคคีและความภาคภูมิใจของชุมชนอย่างงดงาม",
    images: [
      {
        id: "1",
        filename: "bangfai-01.jpg",
        url: "/activities/sample-1.jpg",
        caption: "ขบวนแห่บั้งไฟ",
      },
      {
        id: "2",
        filename: "bangfai-02.jpg",
        url: "/activities/sample-2.jpg",
        caption: "การจุดบั้งไฟ",
      },
      {
        id: "3",
        filename: "bangfai-03.jpg",
        url: "/activities/sample-3.jpg",
        caption: "บรรยากาศงาน",
      },
      {
        id: "4",
        filename: "bangfai-04.jpg",
        url: "/activities/sample-4.jpg",
        caption: "ชาวบ้านร่วมงาน",
      },
      {
        id: "5",
        filename: "bangfai-05.jpg",
        url: "/activities/sample-5.jpg",
        caption: "การแสดงหมอลำ",
      },
      {
        id: "6",
        filename: "bangfai-06.jpg",
        url: "/activities/sample-6.jpg",
        caption: "บั้งไฟสวยงาม",
      },
    ],
  },
  {
    id: "khao-homali-fair-2568",
    title: "เทศกาลข้าวหอมมะลิทุ่งมน 2568",
    date: "20 พฤศจิกายน 2568",
    category: "เกษตร",
    categoryStyle: "bg-amber-100 text-amber-700",
    coverGradient: "from-amber-50 to-yellow-100",
    coverImage: "/activities/sample-2.jpg",
    excerpt:
      "เทศกาลฉลองผลผลิตข้าวหอมมะลิคุณภาพสูงจากทุ่งนาของบ้านทุ่งมน พร้อมนิทรรศการ การสาธิตการเกษตร และตลาดสินค้าชุมชน",
    description:
      "เทศกาลข้าวหอมมะลิทุ่งมนจัดขึ้นเพื่อฉลองการเก็บเกี่ยวผลผลิตข้าวหอมมะลิคุณภาพสูงที่ปลูกในพื้นที่บ้านทุ่งมน ภายในเขตทุ่งกุลาร้องไห้ที่ขึ้นชื่อ ภายในงานมีนิทรรศการแสดงกระบวนการผลิตข้าวอินทรีย์ การสาธิตการสีข้าว และตลาดจำหน่ายผลิตภัณฑ์ชุมชน\n\nนอกจากนี้ยังมีการประกวดข้าวหอมมะลิพันธุ์ดี การบรรยายเรื่องการเกษตรยั่งยืน และบูธแสดงสินค้า OTOP จากกลุ่มแม่บ้านในชุมชน รวมถึงกิจกรรมสำหรับเยาวชนเพื่อสืบสานภูมิปัญญาทางการเกษตร",
    images: [
      {
        id: "1",
        filename: "rice-01.jpg",
        url: "/activities/sample-1.jpg",
        caption: "นิทรรศการข้าวหอมมะลิ",
      },
      {
        id: "2",
        filename: "rice-02.jpg",
        url: "/activities/sample-2.jpg",
        caption: "การสาธิตการสีข้าว",
      },
      {
        id: "3",
        filename: "rice-03.jpg",
        url: "/activities/sample-3.jpg",
        caption: "ตลาดสินค้าชุมชน",
      },
      {
        id: "4",
        filename: "rice-04.jpg",
        url: "/activities/sample-4.jpg",
        caption: "เกษตรกรในชุมชน",
      },
      {
        id: "5",
        filename: "rice-05.jpg",
        url: "/activities/sample-5.jpg",
        caption: "บูธสินค้า OTOP",
      },
    ],
  },
  {
    id: "tree-planting-2568",
    title: "กิจกรรมปลูกป่า สืบสานธรรมชาติ",
    date: "5 มิถุนายน 2568",
    category: "สิ่งแวดล้อม",
    categoryStyle: "bg-emerald-100 text-emerald-700",
    coverGradient: "from-emerald-50 to-green-100",
    coverImage: "/activities/sample-3.jpg",
    excerpt:
      "กิจกรรมปลูกต้นไม้พร้อมกันทั้งบ้านทุ่งมนเนื่องในวันสิ่งแวดล้อมโลก เพื่อฟื้นฟูป่าชุมชนและปลูกฝังจิตสำนึกรักษ์ธรรมชาติให้เยาวชน",
    description:
      'เนื่องในวันสิ่งแวดล้อมโลก 5 มิถุนายน ชุมชนบ้านทุ่งมนจัดกิจกรรมปลูกต้นไม้พร้อมกันทั้งบ้านทุ่งมน โดยมีผู้นำชุมชน เยาวชน และชาวบ้านเข้าร่วมกว่า 300 คน มีการปลูกต้นไม้ท้องถิ่นกว่า 500 ต้น ในพื้นที่ป่าชุมชนและบริเวณริมทางสาธารณะ\n\nกิจกรรมนี้เป็นส่วนหนึ่งของโครงการ "ทุ่งมนเขียว" ที่มุ่งฟื้นฟูพื้นที่สีเขียวในชุมชนและปลูกฝังจิตสำนึกรักษ์สิ่งแวดล้อมให้กับเยาวชนรุ่นใหม่ เพื่อให้ชุมชนมีความอุดมสมบูรณ์สืบต่อไป',
    images: [
      {
        id: "1",
        filename: "tree-01.jpg",
        url: "/activities/sample-1.jpg",
        caption: "พิธีเปิดกิจกรรม",
      },
      {
        id: "2",
        filename: "tree-02.jpg",
        url: "/activities/sample-2.jpg",
        caption: "เยาวชนร่วมปลูกต้นไม้",
      },
      {
        id: "3",
        filename: "tree-03.jpg",
        url: "/activities/sample-3.jpg",
        caption: "ชาวบ้านร่วมแรงใจ",
      },
      {
        id: "4",
        filename: "tree-04.jpg",
        url: "/activities/sample-4.jpg",
        caption: "พื้นที่ป่าชุมชน",
      },
      {
        id: "5",
        filename: "tree-05.jpg",
        url: "/activities/sample-5.jpg",
        caption: "ต้นกล้าพันธุ์ท้องถิ่น",
      },
    ],
  },
  {
    id: "silk-weaving-2568",
    title: "งานแสดงผ้าไหมบ้านทุ่งมน 2568",
    date: "15 มกราคม 2568",
    category: "วัฒนธรรม",
    categoryStyle: "bg-purple-100 text-purple-700",
    coverGradient: "from-purple-50 to-pink-100",
    coverImage: "/activities/sample-4.jpg",
    excerpt:
      "นิทรรศการแสดงและจำหน่ายผ้าไหมพื้นเมืองลวดลายงดงาม สืบสานภูมิปัญญาการทอผ้าของชุมชนและส่งเสริมรายได้กลุ่มแม่บ้าน",
    description:
      "งานแสดงผ้าไหมบ้านทุ่งมนจัดขึ้นเพื่อส่งเสริมและอนุรักษ์ภูมิปัญญาการทอผ้าไหมพื้นเมืองที่สืบทอดกันมาแต่โบราณ กลุ่มแม่บ้านในบ้านทุ่งมนได้นำผลงานผ้าไหมหลากลวดลายมาแสดงและจำหน่าย ทั้งผ้าไหมมัดหมี่ ผ้าขิด และผ้าพื้น\n\nภายในงานยังมีการสาธิตการทอผ้าให้ผู้เยี่ยมชมได้ชมและทดลอง พร้อมทั้งการจำหน่ายผ้าไหมราคาย่อมเยาจากผู้ผลิตโดยตรง เพื่อสนับสนุนรายได้ให้กับกลุ่มทอผ้าในชุมชนอย่างยั่งยืน",
    images: [
      {
        id: "1",
        filename: "silk-01.jpg",
        url: "/activities/sample-1.jpg",
        caption: "ผ้าไหมมัดหมี่",
      },
      {
        id: "2",
        filename: "silk-02.jpg",
        url: "/activities/sample-2.jpg",
        caption: "การสาธิตทอผ้า",
      },
      {
        id: "3",
        filename: "silk-03.jpg",
        url: "/activities/sample-3.jpg",
        caption: "กลุ่มแม่บ้านทอผ้า",
      },
      {
        id: "4",
        filename: "silk-04.jpg",
        url: "/activities/sample-4.jpg",
        caption: "ลวดลายผ้าขิด",
      },
      {
        id: "5",
        filename: "silk-05.jpg",
        url: "/activities/sample-5.jpg",
        caption: "นิทรรศการผ้าไหม",
      },
      {
        id: "6",
        filename: "silk-06.jpg",
        url: "/activities/sample-6.jpg",
        caption: "ผู้เยี่ยมชมงาน",
      },
    ],
  },
];
