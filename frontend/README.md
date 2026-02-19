# Frontend – Compro Website

Single Page Application (SPA) flr company profile website. Built with **React 19** + **Vite** + **TailwindCSS 4**.

## Tech Stack

| Package              | Fungsi                                    |
| -------------------- | ----------------------------------------- |
| `react` + `react-dom`| UI library                                |
| `react-router-dom`   | Client-side routing                       |
| `axios`              | HTTP client untuk komunikasi ke backend API |
| `react-icons`        | Icon library                              |
| `tailwindcss`        | CSS framework (v4, via Vite plugin)       |
| `@tailwindcss/vite`  | TailwindCSS integration untuk Vite        |
| `vite`               | Build tool & dev server                   |
| `@vitejs/plugin-react` | React support untuk Vite                  |
| `eslint`             | Linter                                    |

## Setup Local Development

### 1. Install dependencies

```bash
cd frontend
npm install
```

### 2. Pastiin backend udah jalan

Frontend butuh backend API untuk menampilkan data blog dan handle auth. Pastikan backend udah running di `http://localhost:3000` (lihat [Backend README](../backend/README.md)).

### 3. Update Vite proxy (opsional)

Untuk development, buka `vite.config.js` dan pastikan proxy redirect ke backend local:

```js
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:3000',  // ← uncomment baris ini
      changeOrigin: true,
    },
  },
},
```

> [!NOTE]
> By default, proxy redirect ke URL production. Ganti ke `localhost:3000` kalau mau pake backend local.

### 4. Jalanin development server

```bash
npm run dev
```

Frontend run di `http://localhost:5173` (default Vite).

## Struktur Folder

```
frontend/src/
├── App.jsx              → Root component & routing setup
├── main.jsx             → React entry point
├── App.css              → Global styles
├── pages/
│   ├── Home.jsx         → Landing page
│   ├── Services.jsx     → Halaman layanan
│   ├── About.jsx        → Halaman tentang
│   ├── Contact.jsx      → Halaman kontak
│   ├── BlogDetail.jsx   → Detail blog post
│   └── admin/
│       ├── Login.jsx    → Login page admin
│       └── Dashboard.jsx → Blog management dashboard
├── components/
│   ├── Navbar.jsx       → Header navigation
│   ├── Footer.jsx       → Footer
│   ├── SectionOne–Four.jsx → Homepage sections
│   ├── LoadingScreen.jsx   → Loading indicator
│   └── ScrollToTop.jsx     → Scroll reset antar halaman
└── assets/              → Gambar & static files
```

## Halaman & Routes

| Route               | Halaman       | Deskripsi                    |
| -------------------- | ------------- | ---------------------------- |
| `/`                  | Home          | Landing page utama           |
| `/services`          | Services      | Daftar layanan               |
| `/about`             | About         | Info perusahaan              |
| `/contact`           | Contact       | Form / info kontak           |
| `/blog/:id`          | BlogDetail    | Baca detail artikel blog     |
| `/admin`             | Login         | Halaman login admin          |
| `/admin/dashboard`   | Dashboard     | Manage blog (butuh login)    |

## Build Production

```bash
npm run build
```

Output build ada di folder `dist/`. File `vercel.json` udah di-config untuk handle SPA routing dan proxy API ke backend production.

## Available Scripts

| Script          | Command           | Fungsi                      |
| --------------- | ----------------- | --------------------------- |
| `npm run dev`   | `vite`            | Jalanin dev server          |
| `npm run build` | `vite build`      | Build production bundle     |
| `npm run lint`  | `eslint .`        | Jalanin linter              |
| `npm run preview` | `vite preview`  | Preview production build    |
