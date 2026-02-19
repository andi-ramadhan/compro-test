# Backend – Compro API

REST API untuk company profile website. Built with **ExpressJS** and **PostgreSQL** via **pg-promise**.

## Tech Stack

| Package             | Fungsi                                      |
| ------------------- | ------------------------------------------- |
| `express`           | Web framework                               |
| `pg` + `pg-promise` | PostgreSQL client & query builder            |
| `bcrypt`            | Hash password                               |
| `jsonwebtoken`      | Generate & verify JWT token                 |
| `cors`              | Handle Cross-Origin requests                |
| `dotenv`            | Load environment variables dari file `.env` |
| `express-validator` | Validasi request body                       |
| `nanoid`            | Generate unique ID                          |
| `node-pg-migrate`   | Database migration tool (dev dependency)    |
| `nodemon`           | Auto-restart server for development         |

## Setup Local Development

### 1. Install dependencies

```bash
cd backend
npm install
```

### 2. Jalanin PostgreSQL pake Docker

Project ini juga menyediakan `docker-compose.yaml` untuk spin up PostgreSQL via docker. Tinggal jalanin:

```bash
docker compose up -d
```

Ini bakal bikin container PostgreSQL dengan config:

| Setting    | Value          |
| ---------- | -------------- |
| Host       | `localhost`    |
| Port       | `5432`         |
| User       | `compro_admin` |
| Password   | `compro_admin` |
| Database   | `compro_db`    |

### 3. Setup environment variables

Buat file `.env` di folder `backend/` (atau edit yang udah ada):

```env
# PostgreSQL
POSTGRES_USER=compro_admin
POSTGRES_PASSWORD=compro_admin
POSTGRES_DB=compro_db

# JWT
JWT_SECRET=compro_secret_key_2026

# Server
PORT=3000

# Database URL
DATABASE_URL=postgres://compro_admin:compro_admin@localhost:5432/compro_db
```

> [!TIP]
> Ganti `JWT_SECRET` ke sesuatu yang lebih aman kalau mau deploy ke production.

### 4. Jalanin database migration

```bash
npm run migrate up
```

Create tabel `users` dan `blog_data` di database.

### 5. Seed admin user

```bash
npm run seed
```

Create user admin:

| Field    | Value    |
| -------- | -------- |
| Username | `admin`  |
| Password | `secret` |

> [!IMPORTANT]
> Ganti password admin untuk production.

### 6. Jalanin development server

```bash
npm run dev
```

Server akan run di `http://localhost:3000`. Coba hit `/api/health` untuk cek apakah server udah jalan.

## Struktur Folder

```
backend/
├── src/
│   ├── server.js              → Entry point, Express setup
│   ├── routes/routes.js       → Semua API route definitions
│   ├── controllers/
│   │   ├── authController.js  → Register & login logic
│   │   └── blogController.js  → CRUD blog logic
│   ├── middleware/
│   │   └── authMiddleware.js  → JWT verification middleware
│   ├── database/
│   │   └── pg.js              → PostgreSQL connection (pg-promise)
│   └── seed.js                → Admin user seeder
├── migrations/                → Database migration files
├── docker-compose.yaml        → PostgreSQL Docker config
├── vercel.json                → Vercel deployment config
├── .env                       → Environment variables (jangan di-commit!)
└── package.json
```

## Quick Test

Setelah server jalan, coba endpoint berikut:

```bash
# Health check
curl http://localhost:3000/api/health
```
