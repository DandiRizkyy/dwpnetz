# DWPNETZ — E-Commerce Paket Data Internet

## Overview

Prototype website e-commerce untuk pembelian paket data internet, dibuat sebagai bagian dari frontend technical test. Fokusnya bukan sekedar tampilan — tapi bagaimana user bisa beli paket dengan sesimple mungkin, dari buka halaman sampai transaksi selesai.

Flow utamanya:

```
Landing Page (publik) → [Beli Paket] → Login → Pilih Paket → Input Nomor → Checkout → Success → History → Repeat Order
```

User yang belum login bisa melihat landing page dan katalog paket. Untuk membeli, diarahkan ke halaman login terlebih dahulu.

---

## Tech Stack

**Frontend**

- React + Vite
- Ant Design — komponen utama (Form, Button, Card, Modal, Tag, Statistic, Drawer, dll)
- Ant Design Icons — ikon konsisten di seluruh halaman
- Zustand — state management (user session + saldo)
- React Router DOM
- Axios

**Backend (Mock)**

- json-server — REST API dari `db.json`

---

## Requirements

- Node.js >= 18
- npm

---

## Cara Jalankan

### 1. Clone Repository

```bash
git clone https://github.com/DandiRizkyy/dwpnetz.git
```

### 2. Masuk ke folder dwpnetz lalu Install dependencies

```bash
npm install
```

### 3. Jalankan sekaligus (json-server + frontend)

```bash
npm run start
```

Atau pisah kalau perlu:

```bash
# Terminal 1
npx json-server --watch db.json --port 3000

# Terminal 2
npm run dev
```

**Demo login:** `email: user@gmail.com` || `password: test123`

---

## Fitur

### Landing Page (Publik)

Halaman utama yang bisa diakses tanpa login. Menampilkan hero banner, 3 keunggulan layanan, dan preview 6 paket terpopuler. Guest bisa lihat-lihat paket, tapi diarahkan login dulu saat mau beli.

### Authentication

Login pakai email + password yang divalidasi lewat json-server. Password di-hash pakai bcrypt. Setelah login, user diarahkan ke landing page.

### Katalog Paket

List semua paket dari berbagai provider. Ada filter per provider (Telkomsel, XL, Indosat, Tri, Smartfren). Bisa diakses publik — guest langsung diarahkan login saat klik beli.

### Transaksi

User input nomor HP, provider langsung terdeteksi otomatis dari prefix nomor. Kalau nomornya tidak sesuai provider paket yang dipilih, langsung ada warning sebelum lanjut. Validasi saldo juga dilakukan di sini — kalau kurang, ada tombol langsung ke Top Up. Input nomor HP hanya menerima angka dan karakter `+`.

### Halaman Sukses

Setelah transaksi berhasil, user diarahkan ke halaman konfirmasi yang menampilkan detail lengkap: paket, nomor tujuan, total bayar, waktu, dan ID transaksi. Ada opsi kembali ke beranda, lihat riwayat, atau beli lagi paket yang sama.

### Riwayat Transaksi

Semua transaksi user ditampilkan, sorted terbaru di atas. Ada filter per provider. Setiap item punya tombol "Beli Lagi" yang langsung pre-fill data transaksi sebelumnya ke halaman checkout.

### Top Up Saldo

Pilih nominal dari preset (20rb–500rb) atau input sendiri. Ada preview saldo setelah top up sebelum konfirmasi.

### Profil

Info akun, statistik total transaksi & pengeluaran, dan tombol logout dengan konfirmasi modal.

---

## Navigasi

**Desktop** — navbar atas dengan logo, menu links, balance pill (klik untuk top up), avatar (klik untuk profil), dan tombol logout.

**Mobile** — navbar tetap di atas, menu bisa dibuka lewat hamburger button yang membuka drawer dari kanan.

---

## Struktur Project

```
src/
├── components/
│   └── common/
│       ├── MainLayout.jsx    # navbar atas, mobile drawer
│       └── AuthRoute.jsx     # route guard (protected routes)
│
├── pages/
│   ├── Landing.jsx
│   ├── Login.jsx
│   ├── Packages.jsx
│   ├── Transaction.jsx
│   ├── Success.jsx
│   ├── History.jsx
│   ├── Topup.jsx
│   └── Profile.jsx
│
├── services/
│   └── api.js
│
├── store/
│   └── useStore.js           # Zustand: user state + saldo
│
├── constants/
│   └── constant.js
│
└── utils/
    └── detectProvider.js     # auto-detect dari prefix nomor HP
```

---

## Routing

| Path           | Akses  | Halaman              |
| -------------- | ------ | -------------------- |
| `/`            | Publik | Landing page         |
| `/packages`    | Publik | Katalog paket        |
| `/login`       | Publik | Login                |
| `/transaction` | Login  | Form beli paket      |
| `/success`     | Login  | Konfirmasi transaksi |
| `/history`     | Login  | Riwayat transaksi    |
| `/topup`       | Login  | Top up saldo         |
| `/profile`     | Login  | Profil & statistik   |

---

## State Management

Zustand dengan `persist` middleware — user state tetap ada setelah refresh. Yang disimpan: data user dan saldo terkini. Setiap kali transaksi atau top up berhasil, state langsung diupdate tanpa perlu reload.

---

## Catatan

- Tidak ada pagination di history — semua transaksi di-fetch sekaligus dan difilter di client. Untuk skala produksi perlu server-side pagination.
- `detectProvider` berdasarkan prefix 4 digit nomor HP, mencakup Telkomsel, XL, Indosat, Tri, dan Smartfren.
- json-server berjalan di port 3000, Vite di port 5173 (default).
