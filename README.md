# DWPNETZ — E-Commerce Paket Data Internet

## Overview

Prototype website e-commerce untuk pembelian paket data internet, dibuat sebagai bagian dari frontend technical test. Fokusnya bukan sekedar tampilan — tapi bagaimana user bisa beli paket dengan sesimple mungkin, dari buka halaman sampai transaksi selesai.

Flow utamanya:

```
Login → Dashboard → Pilih Paket → Input Nomor → Checkout → Success → History → Repeat Order
```

---

## Tech Stack

**Frontend**

- React + Vite
- Ant Design — komponen utama (Form, Button, Card, Modal, Tag, Statistic, dll)
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

### Authentication

Login pakai email + password yang divalidasi lewat json-server. Password di-hash pakai bcrypt. Sengaja tidak ada register — user langsung bisa akses semua fitur setelah masuk.

### Dashboard

Halaman pertama setelah login. Menampilkan saldo aktif, statistik transaksi, shortcut beli paket & top up, dan 4 transaksi terakhir.

### Katalog Paket

List semua paket dari berbagai provider. Ada filter per provider (Telkomsel, XL, Indosat, Tri) biar user tidak perlu scroll semua kalau sudah tahu mau beli yang mana.

### Transaksi

User input nomor HP, provider langsung terdeteksi otomatis dari prefix nomor. Kalau nomornya tidak sesuai provider paket yang dipilih, langsung ada warning sebelum lanjut. Validasi saldo juga dilakukan di sini, kalau kurang, ada tombol langsung ke Top Up.

### Halaman Sukses

Setelah transaksi berhasil, user diarahkan ke halaman konfirmasi yang menampilkan detail lengkap: paket, nomor tujuan, total bayar, waktu, dan ID transaksi. Ada opsi kembali ke dashboard, lihat riwayat, atau beli lagi paket yang sama.

### Riwayat Transaksi

Semua transaksi user ditampilkan, sorted terbaru di atas. Ada filter per provider. Setiap item punya tombol "Beli Lagi" yang langsung pre-fill data transaksi sebelumnya ke halaman checkout.

### Top Up Saldo

Pilih nominal dari preset (20rb–500rb) atau input sendiri. Ada preview saldo setelah top up sebelum konfirmasi.

### Profil

Info akun, statistik pengeluaran, dan tombol logout dengan konfirmasi modal.

---

## Navigasi

**Desktop** — sidebar tetap di kiri, topbar menampilkan saldo aktif.

**Mobile** — sidebar bisa dibuka lewat hamburger button, navigasi utama via bottom bar.

Tombol logout tersedia di sidebar (desktop & mobile) dan di halaman profil.

---

## Struktur Project

```
src/
├── components/
│   ├── common/
│       ├── AppLayout.jsx     # sidebar, topbar, bottom nav
│       └── AuthRoute.jsx     # Route guard
│
│
│
├── pages/
│   ├── Login.jsx
│   ├── Dashboard.jsx
│   ├── Packages.jsx
│   ├── Transaction.jsx
│   ├── Success.jsx
│   ├── History.jsx
│   ├── TopUp.jsx
│   └── Profile.jsx
│
├── services/
│   └── api.js
│
├── store/
│   └── useStore.js           # Zustand: user state + saldo
│
└── utils/
    └── detectProvider.js     # Auto-detect dari prefix nomor HP
```

---

## State Management

Zustand dengan `persist` middleware — user state tetap ada setelah refresh. Yang disimpan: data user dan saldo terkini. Setiap kali transaksi atau top up berhasil, state langsung diupdate tanpa perlu reload.

---

## Catatan

- Tidak ada pagination di history — semua transaksi di-fetch sekaligus dan difilter di client. Untuk skala produksi perlu server-side pagination.
- `detectProvider` berdasarkan prefix 4 digit nomor HP, mencakup Telkomsel, XL, Indosat, Tri, dan Smartfren.
- json-server berjalan di port 3000, Vite di port 5173 (default).
