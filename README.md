# Compro – Company Profile Website

Website company profile lengkap dengan blog CMS. Dibangun dengan arsitektur **monorepo** yang memisahkan frontend dan backend jadi dua project terpisah.

## Fitur Utama

- **Landing page** – Home, Services, About, Contact
- **Blog** – Halaman blog dinamis yang kontennya diambil dari database
- **Admin panel** – Login & dashboard untuk manage konten blog (CRUD)
- **Auth system** – JWT-based authentication buat proteksi endpoint admin

## Arsitektur

```
compro/
├── frontend/    → React SPA (client-side)
├── backend/     → REST API (server-side)
└── README.md    → You're here 👋
```

Project ini menggunakan pendekatan **decoupled architecture**:

- **Frontend** mengirim request ke backend via `/api` proxy (di-handle Vite saat development, Vercel rewrites for production).
- **Backend** provide REST API yang handle auth, blog CRUD, dan koneksi ke PostgreSQL.
- Keduanya di-deploy terpisah ke **Vercel**.

### Tech Stack

| Layer        | Teknologi                                                       |
| ------------ | --------------------------------------------------------------- |
| **Frontend** | React 19, Vite, TailwindCSS 4, React Router                     |
| **Backend**  | Express 5, pg-promise, PostgreSQL, JWT, bcrypt                  |
| **Database** | PostgreSQL (Docker buat local, hosted on dbase.id buat prod)    |
| **Deploy**   | Vercel (frontend & backend masing-masing terpisah)              |

### Alur Request (Simplified)

```
Browser → Frontend (React SPA)
              ↓ /api/*
         Vite Proxy (dev) / Vercel Rewrite (prod)
              ↓
         Backend (Express REST API)
              ↓
         PostgreSQL Database
```

## Setup Local Development

Buat jalanin project ini di local, kamu perlu setup **dua-duanya** (frontend & backend). Ikutin panduan di masing-masing folder:

| Folder       | README                              | Deskripsi                                |
| ------------ | ----------------------------------- | ---------------------------------------- |
| `frontend/`  | [📖 Frontend README](frontend/README.md) | Setup React dev server                   |
| `backend/`   | [📖 Backend README](backend/README.md)   | Setup Express API, database, & migration |

### Urutan Setup yang Disarankan

1. **Backend dulu** – karena frontend butuh API buat jalan
2. **Frontend** – tinggal `npm install` dan `npm run dev`

### Prerequisites

Sebelum mulai, pastiin kamu udah punya:

- **Node.js** (v18+)
- **npm**
- **Docker & Docker Compose** (buat PostgreSQL local, atau install PostgreSQL local tanpa perlu docker-compose.yml)
- **Git**

## Struktur Backend

```
backend/src/
├── server.js            → Entry point, setup Express & middleware
├── routes/routes.js     → Definisi semua API routes
├── controllers/
│   ├── authController.js   → Logic register & login
│   └── blogController.js   → Logic CRUD blog
├── middleware/
│   └── authMiddleware.js   → JWT token verification
├── database/
│   └── pg.js               → Koneksi PostgreSQL (pg-promise)
└── seed.js              → Seeder buat bikin admin user pertama
```

## Struktur Frontend

```
frontend/src/
├── App.jsx               → Root component, routing & layout
├── main.jsx              → Entry point React
├── pages/
│   ├── Home.jsx          → Landing page
│   ├── Services.jsx      → Halaman layanan
│   ├── About.jsx         → Halaman tentang perusahaan
│   ├── Contact.jsx       → Halaman kontak
│   ├── BlogDetail.jsx    → Detail artikel blog
│   └── admin/
│       ├── Login.jsx     → Halaman login admin
│       └── Dashboard.jsx → Dashboard manage blog
├── components/
│   ├── Navbar.jsx        → Navigasi utama
│   ├── Footer.jsx        → Footer website
│   ├── SectionOne.jsx    → Section hero / landing
│   ├── SectionTwo.jsx    → Section kedua homepage
│   ├── SectionThree.jsx  → Section ketiga homepage
│   ├── SectionFour.jsx   → Section keempat homepage (blog preview)
│   ├── LoadingScreen.jsx → Loading indicator
│   └── ScrollToTop.jsx   → Auto scroll ke atas pas pindah halaman
└── assets/               → Gambar & asset statis
```

## API Endpoints

| Method   | Endpoint             | Auth  | Deskripsi              |
| -------- | -------------------- | ----- | ---------------------- |
| `GET`    | `/api/health`        | ❌    | Health check           |
| `POST`   | `/api/auth/register` | ❌    | Register new user      |
| `POST`   | `/api/auth/login`    | ❌    | Login, get JWT token   |
| `GET`    | `/api/blogs`         | ❌    | Fetch All blogs        |
| `GET`    | `/api/blogs/:id`     | ❌    | Fetch blog by ID       |
| `POST`   | `/api/blogs`         | ✅    | Add new blog           |
| `PUT`    | `/api/blogs/:id`     | ✅    | Update blog            |
| `DELETE` | `/api/blogs/:id`     | ✅    | Delete blog            |

## License

ISC
