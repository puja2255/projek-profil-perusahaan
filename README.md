# PT Golden IB Company Profile

Web profil perusahaan dengan nuansa premium gelap dan aksen gold, dibangun memakai React Native via Expo, PostgreSQL, dan Prisma.

## Ringkasan

Project ini berisi:

- Landing page company profile yang mengikuti gaya visual referensi
- Halaman khusus untuk produk, kegiatan, dan mitra
- Pop-up detail saat item diklik
- CRUD untuk produk, kegiatan, mitra, dan struktur organisasi yang tampil di beranda
- Backend API Express + Prisma
- Database PostgreSQL

## Struktur Folder

- `app/` untuk halaman Expo Router
- `src/components/` untuk komponen UI
- `src/context/` untuk state data aplikasi
- `src/lib/` untuk helper API
- `src/mockData.ts` untuk data contoh
- `server/` untuk backend API
- `prisma/schema.prisma` untuk skema database

## Teknologi

- Frontend: React Native + Expo + Expo Router
- Backend: Node.js + Express
- ORM: Prisma
- Database: PostgreSQL

## Persiapan Sebelum Menjalankan

### 1. Install software yang dibutuhkan

Pastikan laptop sudah punya:

- Node.js versi LTS
- npm
- PostgreSQL
- Git
- Android Studio atau browser modern jika ingin menjalankan preview web

### 2. Cek versi Node

Disarankan pakai Node.js 18 atau 20.

```bash
node -v
npm -v
```

### 3. Siapkan database PostgreSQL

Buat database baru, misalnya:

- nama database: `pt_golden_ib`
- username: sesuai instalasi PostgreSQL kamu
- password: sesuai instalasi PostgreSQL kamu

Contoh format connection string:

```env
DATABASE_URL="postgresql://postgres:password_kamu@localhost:5432/pt_golden_ib?schema=public"
```

## Cara Menjalankan di Laptop Ini

### 1. Install dependency root project

Dari folder project utama:

```bash
npm install
```

### 2. Install dependency backend

Masuk ke folder `server` lalu install package:

```bash
cd server
npm install
```

### 3. Buat file environment

Di root project, buat file `.env` dari contoh berikut:

```env
DATABASE_URL="postgresql://postgres:password_kamu@localhost:5432/pt_golden_ib?schema=public"
EXPO_PUBLIC_API_URL="http://localhost:4000/api"
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="admin123"
AUTH_SECRET="ganti-dengan-string-rahasia-yang-panjang"
```

Kalau nanti backend dipindah ke laptop lain atau server lain, `EXPO_PUBLIC_API_URL` harus diganti ke alamat baru.

### 4. Jalankan Prisma

Masih di folder `server`, push schema ke database:

```bash
npm run db:push
```

Kalau kamu ingin melihat isi database lewat UI Prisma:

```bash
npm run db:studio
```

### 5. Jalankan backend API

Masih di folder `server`:

```bash
npm run dev
```

Backend akan berjalan di:

```text
http://localhost:4000
```

Health check:

```text
http://localhost:4000/api/health
```

### 6. Jalankan frontend Expo

Buka terminal baru di root project, lalu:

```bash
npm start
```

Atau khusus web:

```bash
npm run web
```

Jika ingin Android:

```bash
npm run android
```

Jika ingin iOS:

```bash
npm run ios
```

## Cara Menjalankan di Laptop Lain

Kalau project dipindah ke laptop lain, langkahnya seperti ini:

### Opsi A: Pindah via Git

1. Clone repository ke laptop baru
2. Install Node.js, PostgreSQL, dan Git
3. Buat database PostgreSQL baru
4. Buat file `.env` di root project
5. Jalankan `npm install` di root
6. Jalankan `npm install` di folder `server`
7. Jalankan `npm run db:push` di folder `server`
8. Jalankan backend dengan `npm run dev`
9. Jalankan frontend dengan `npm start`

### Opsi B: Copy folder project manual

1. Copy seluruh folder project ke laptop baru
2. Pastikan folder `node_modules` tidak perlu ikut dicopy
3. Install ulang dependency dengan `npm install`
4. Install dependency backend dengan `npm install` di folder `server`
5. Siapkan database baru atau arahkan ke database yang sudah ada
6. Sesuaikan file `.env`
7. Jalankan Prisma dan server seperti biasa

### Hal yang wajib dicek saat pindah laptop

- Versi Node.js cocok
- PostgreSQL aktif
- Port `4000` tidak bentrok
- `DATABASE_URL` benar
- `EXPO_PUBLIC_API_URL` mengarah ke backend yang aktif

## Urutan Start yang Disarankan

Supaya tidak error, jalankan dengan urutan ini:

1. Aktifkan PostgreSQL
2. Jalankan backend `server`
3. Jalankan frontend Expo
4. Buka web di browser

## Troubleshooting

### 1. Error koneksi database

Gejala:

- Prisma gagal jalan
- API error saat query database

Solusi:

- Cek isi `DATABASE_URL`
- Pastikan username dan password benar
- Pastikan database `pt_golden_ib` sudah dibuat
- Pastikan service PostgreSQL sedang hidup

### 2. Port 4000 sudah dipakai

Gejala:

- Backend gagal start

Solusi:

- Tutup aplikasi lain yang memakai port 4000
- Atau ubah `PORT` di backend ke port lain
- Jika port berubah, update juga `EXPO_PUBLIC_API_URL`

### 3. Expo tidak bisa akses backend

Gejala:

- Data dari CRUD tidak muncul
- Request API gagal

Solusi:

- Pastikan backend sudah running
- Untuk web lokal, gunakan `http://localhost:4000/api`
- Jika dijalankan di HP fisik, `localhost` harus diganti ke IP laptop

Contoh untuk HP fisik:

```env
EXPO_PUBLIC_API_URL="http://192.168.1.10:4000/api"
```

### 4. Aplikasi dibuka di HP tapi API tidak jalan

Ini biasanya karena `localhost` dari HP berarti HP itu sendiri, bukan laptop.

Solusi:

- Cari IP lokal laptop
- Ganti `EXPO_PUBLIC_API_URL` ke IP laptop
- Pastikan laptop dan HP berada di jaringan Wi-Fi yang sama

### 5. Prisma error setelah ganti schema

Solusi:

```bash
npx prisma generate
npm run db:push
```

Kalau perlu, restart backend setelah itu.

## Struktur Data yang Didukung

### Produk

- nama produk
- deskripsi
- gambar
- harga
- link Tokopedia
- link Shopee

### Kegiatan

- judul event
- deskripsi kegiatan
- gambar
- tanggal
- lokasi
- tipe event

### Mitra

- nama mitra
- deskripsi
- link sosmed
- logo mitra
- kategori

### Struktur Organisasi

- nama
- role/jabatan
- foto
- order
- parentId untuk relasi hierarki

## Catatan Tentang Upload Gambar

Saat ini field gambar dan logo menggunakan URL, bukan upload file langsung.

Kelebihan pendekatan ini:

- lebih cepat selesai
- lebih mudah diuji di banyak laptop
- lebih stabil untuk demo dan pengembangan awal

Kalau nanti ingin upload file asli, opsi berikut bisa dipakai:

- Cloudinary
- S3
- Supabase Storage
- Upload langsung ke server

## Contoh Alur Kerja Admin

1. Buka halaman `/admin`
2. Pilih tab `Produk`, `Kegiatan`, `Mitra`, atau `Struktur`
3. Isi form
4. Simpan
5. Data langsung muncul di halaman publik
6. Klik kartu item di halaman publik untuk melihat pop-up detail

## File Penting

- [Frontend utama](app/index.tsx)
- [Halaman produk](app/produk.tsx)
- [Halaman kegiatan](app/kegiatan.tsx)
- [Halaman mitra](app/mitra.tsx)
- [Halaman admin CRUD](app/admin.tsx)
- [Halaman login admin](app/login.tsx)
- [State global aplikasi](src/context/AppDataContext.tsx)
- [Schema database Prisma](prisma/schema.prisma)
- [Backend API](server/src/index.ts)

## Kalau Ingin Lanjut Pengembangan

Beberapa pengembangan yang paling cocok setelah ini:

1. Upload gambar asli
2. Login admin
3. Dashboard statistik
4. Seed data otomatis
5. Deploy frontend ke Vercel
6. Deploy backend ke Render/Railway
7. Hosting PostgreSQL di Supabase/Neon

## Ringkas Start Cepat

Kalau kamu sudah yakin semua software ada, jalankan ini:

```bash
npm install
cd server
npm install
npm run db:push
npm run dev
```

Buka terminal lain di root:

```bash
npm start
```

## Catatan

- Field gambar/logo memakai URL supaya alur CRUD tetap sederhana dan stabil.
- Kalau ingin upload file langsung, project ini bisa ditingkatkan ke storage eksternal tanpa mengubah konsep besar aplikasinya.
