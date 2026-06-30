import { Activity, CompanyProfile, OrgMember, Partner, Product, Service } from "./types";

export const companyProfile: CompanyProfile = {
  id: 1,
  name: "PT GOLDEN IB",
  tagline: "Transformasi Bisnis Menjadi Berlian yang Bersinar",
  description:
    "PT Golden IB hadir sebagai mitra strategis untuk mengembangkan brand, meningkatkan performa marketplace, dan membangun pertumbuhan bisnis yang rapi, terukur, serta berkelanjutan.",
  logoUrl: "https://dummyimage.com/512x512/f4c542/1f2329.png&text=GI",
  heroImageUrl: "https://dummyimage.com/1400x900/1f2329/f4c542.png&text=PT+GOLDEN+IB",
  phone: "+62 812-3456-7890",
  email: "hello@ptgoldenib.com",
  address: "Bandung, Indonesia",
  instagramUrl: "https://instagram.com/ptgoldenib",
  whatsappUrl: "https://wa.me/6281234567890"
};

export const philosophy = [
  {
    title: "Kejelasan",
    description: "Semua proses dibuat jelas, rapi, dan mudah dipahami oleh klien maupun tim internal."
  },
  {
    title: "Ketangguhan",
    description: "Fokus pada hasil yang konsisten, bukan hanya tampilan sesaat."
  },
  {
    title: "Akurasi Data",
    description: "Keputusan bisnis dibangun dari data yang terukur dan relevan."
  },
  {
    title: "Prestise",
    description: "Membangun citra brand yang elegan, premium, dan bernilai."
  },
  {
    title: "Multifaset",
    description: "Mampu mendukung berbagai kebutuhan digital marketing secara menyeluruh."
  }
];

export const vision = {
  title: "Menjadi Standar Emas Pemasaran Digital",
  description:
    "Menjadi perusahaan yang dipercaya karena mampu menghadirkan solusi digital yang efektif, rapi, dan memberi dampak nyata pada pertumbuhan klien."
};

export const mission = [
  "Menghadirkan layanan digital yang fokus pada hasil dan kualitas.",
  "Menyusun strategi marketplace dan branding secara terukur.",
  "Membangun komunikasi yang profesional dan mudah dipahami.",
  "Menjaga konsistensi visual, konten, dan performa brand."
];

export const services: Service[] = [
  {
    id: 1,
    title: "Social Media Advertising",
    description: "Strategi iklan untuk menjangkau audiens yang tepat dan meningkatkan konversi.",
    icon: "Ad"
  },
  {
    id: 2,
    title: "Marketplace Optimization",
    description: "Optimasi katalog, konten, dan performa toko untuk menaikkan penjualan.",
    icon: "Store"
  },
  {
    id: 3,
    title: "Video & Content Marketing",
    description: "Produksi konten visual yang membangun citra brand lebih kuat dan berkelas.",
    icon: "Video"
  }
];

export const products: Product[] = [
  {
    id: 1,
    name: "Serri Tea Spearmint 30 Tea Bag",
    description: "Produk herbal premium dengan kemasan elegan untuk kebutuhan kesehatan harian.",
    imageUrl: "https://dummyimage.com/900x700/ffffff/1f2329.png&text=Product+1",
    price: 27000,
    marketLinks: [
      { platform: "tokopedia", url: "https://tokopedia.com" },
      { platform: "shopee", url: "https://shopee.co.id" }
    ]
  },
  {
    id: 2,
    name: "Smartwatch Waterproof T800 Ultra Series 9",
    description: "Smartwatch modern dengan desain sporty dan fitur lengkap.",
    imageUrl: "https://dummyimage.com/900x700/ffffff/1f2329.png&text=Product+2",
    price: 113000,
    marketLinks: [
      { platform: "tokopedia", url: "https://tokopedia.com" },
      { platform: "shopee", url: "https://shopee.co.id" }
    ]
  },
  {
    id: 3,
    name: "Semir Ban Premium Garasi GR Win Lux",
    description: "Cairan perawatan ban untuk hasil mengkilap dan tahan lebih lama.",
    imageUrl: "https://dummyimage.com/900x700/ffffff/1f2329.png&text=Product+3",
    price: 87000,
    marketLinks: [
      { platform: "tokopedia", url: "https://tokopedia.com" },
      { platform: "shopee", url: "https://shopee.co.id" }
    ]
  }
];

export const activities: Activity[] = [
  {
    id: 1,
    title: "Family Gathering",
    description: "Kegiatan kebersamaan internal untuk memperkuat budaya kerja dan relasi tim.",
    imageUrl: "https://dummyimage.com/900x700/ffffff/1f2329.png&text=Activity+1",
    date: "December 2024",
    location: "Bandung",
    gallery: []
  },
  {
    id: 2,
    title: "Momen Bukber",
    description: "Acara buka bersama untuk mempererat hubungan antar tim dan mitra.",
    imageUrl: "https://dummyimage.com/900x700/ffffff/1f2329.png&text=Activity+2",
    date: "Ramadhan 1447 H",
    location: "Jakarta",
    gallery: []
  },
  {
    id: 3,
    title: "Employee Awarding",
    description: "Apresiasi bagi tim berprestasi atas kontribusi terbaiknya.",
    imageUrl: "https://dummyimage.com/900x700/ffffff/1f2329.png&text=Activity+3",
    date: "January 2025",
    location: "Bandung",
    gallery: []
  }
];

export const partners: Partner[] = [
  {
    id: 1,
    name: "Pyok Skincare",
    description: "Brand partner di kategori beauty & health.",
    logoUrl: "https://dummyimage.com/512x512/ffffff/1f2329.png&text=PS",
    socialLinks: [
      { platform: "instagram", url: "https://instagram.com" },
      { platform: "tiktok", url: "https://tiktok.com" }
    ]
  },
  {
    id: 2,
    name: "Garasi Agam",
    description: "Mitra otomotif untuk branding dan distribusi digital.",
    logoUrl: "https://dummyimage.com/512x512/ffffff/1f2329.png&text=GA",
    socialLinks: [
      { platform: "instagram", url: "https://instagram.com" },
      { platform: "website", url: "https://example.com" }
    ]
  },
  {
    id: 3,
    name: "Otsky Store",
    description: "Partner retail dengan fokus pada social commerce dan marketplace.",
    logoUrl: "https://dummyimage.com/512x512/ffffff/1f2329.png&text=OS",
    socialLinks: [
      { platform: "instagram", url: "https://instagram.com" },
      { platform: "youtube", url: "https://youtube.com" }
    ]
  }
];

export const orgMembers: OrgMember[] = [
  { id: 1, name: "Moch Riny Berlian", role: "CEO", level: 1, order: 1 },
  { id: 2, name: "Indra Kurniawan", role: "HRD", parentId: 1, level: 2, order: 1 },
  { id: 3, name: "Dian Satria Intan", role: "Finance", parentId: 2, level: 3, order: 1 },
  { id: 4, name: "M Surya Zamzanie", role: "Branding", parentId: 2, level: 3, order: 2 },
  { id: 5, name: "Maulana Golden R", role: "Marketplace", parentId: 2, level: 3, order: 3 },
  { id: 6, name: "Rendy", role: "Dev Support", parentId: 2, level: 3, order: 4 }
];
