# FAVE Việt Nam - Website HVAC

Website doanh nghiệp chuyên nghiệp cho Công ty FAVE Việt Nam - lĩnh vực HVAC/điện lạnh/điều hòa không khí trung tâm.

## Tech Stack

- **Frontend:** Next.js 15 App Router + TypeScript + TailwindCSS
- **Backend:** Next.js API Routes
- **Database:** PostgreSQL + Prisma ORM
- **Auth:** NextAuth.js (admin)
- **i18n:** next-intl (Tiếng Việt / English)
- **Deploy:** Vercel + Supabase PostgreSQL

## Cài đặt

### 1. Clone và cài dependencies

```bash
git clone <repo-url>
cd fave-vietnam
npm install
```

### 2. Cấu hình môi trường

```bash
cp .env.example .env.local
```

Sửa `.env.local` với thông tin thực tế:

```env
DATABASE_URL=postgresql://user:password@host:6543/fave_vietnam?pgbouncer=true&connection_limit=10
DIRECT_URL=postgresql://user:password@host:5432/fave_vietnam
NEXTAUTH_SECRET=your-random-secret-32-chars
NEXTAUTH_URL=http://localhost:3000
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
ADMIN_EMAIL=Favevietnam@gmail.com
```

### 3. Tạo database và migrate

```bash
# Migration lần đầu
npx prisma migrate dev --name init

# Hoặc nếu đã có DB, push schema
npx prisma db push
```

### 4. Seed data mẫu

```bash
npx prisma db seed
```

> Tài khoản admin mặc định: `admin@fave.com.vn` / `Admin@123456`

### 5. Chạy development

```bash
npm run dev
```

Truy cập:
- Website: http://localhost:3000
- Admin: http://localhost:3000/admin

### 6. Build production

```bash
npm run build
npm start
```

## Deploy lên Vercel + Supabase

### Bước 1: Tạo Supabase project

1. Vào [supabase.com](https://supabase.com) → New Project
2. Copy **Connection String** (pooler + direct) trong Settings > Database
3. Copy **Project URL** và **Service Role Key** trong Settings > API

### Bước 2: Thêm env variables trên Vercel

```
DATABASE_URL=<Supabase pooler URL với ?pgbouncer=true&connection_limit=10>
DIRECT_URL=<Supabase direct URL>
NEXTAUTH_SECRET=<random 32-char string>
NEXTAUTH_URL=https://your-domain.vercel.app
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-gmail-app-password
ADMIN_EMAIL=Favevietnam@gmail.com
```

### Bước 3: Deploy

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Bước 4: Migrate database trên production

```bash
# Set DIRECT_URL locally (dùng connection string trực tiếp)
DATABASE_URL=<direct-url> npx prisma migrate deploy

# Seed data
DATABASE_URL=<direct-url> npx prisma db seed
```

## Cấu trúc thư mục

```
fave-vietnam/
├── app/
│   ├── [locale]/          # Public pages (vi/en)
│   │   ├── page.tsx       # Trang chủ
│   │   ├── gioi-thieu/    # Giới thiệu
│   │   ├── dich-vu/       # Dịch vụ
│   │   ├── san-pham/      # Sản phẩm
│   │   ├── du-an/         # Dự án
│   │   ├── nang-luc/      # Năng lực
│   │   ├── tin-tuc/       # Tin tức
│   │   ├── lien-he/       # Liên hệ
│   │   └── tuyen-dung/    # Tuyển dụng
│   ├── admin/             # Admin dashboard
│   │   ├── login/
│   │   ├── services/
│   │   ├── products/
│   │   ├── projects/
│   │   ├── news/
│   │   ├── recruitment/
│   │   ├── quotes/
│   │   ├── contacts/
│   │   ├── media/
│   │   ├── settings/
│   │   ├── partners/
│   │   └── certificates/
│   └── api/               # API routes
├── components/
│   ├── layout/            # Navbar, Footer, FloatingButtons
│   └── sections/          # Hero, Services, Products, etc.
├── lib/
│   ├── prisma.ts          # Prisma client
│   ├── auth.ts            # NextAuth config
│   ├── email.ts           # Nodemailer
│   ├── upload.ts          # File upload
│   └── utils.ts           # Utilities
├── messages/
│   ├── vi.json            # Tiếng Việt
│   └── en.json            # English
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── seed.ts            # Seed data
└── public/
    └── uploads/           # Upload directory
```

## Admin modules

| Module | URL |
|--------|-----|
| Dashboard | /admin |
| Dịch vụ | /admin/services |
| Sản phẩm | /admin/products |
| Dự án | /admin/projects |
| Tin tức | /admin/news |
| Tuyển dụng | /admin/recruitment |
| Báo giá | /admin/quotes |
| Liên hệ | /admin/contacts |
| Media | /admin/media |
| Đối tác | /admin/partners |
| Chứng chỉ | /admin/certificates |
| Cài đặt | /admin/settings |

## Liên hệ kỹ thuật

- **Hotline:** 0981907109
- **Email:** Favevietnam@gmail.com
- **Địa chỉ:** 348 Đường Bưởi, Nghĩa Đô, Ba Đình, Hà Nội
