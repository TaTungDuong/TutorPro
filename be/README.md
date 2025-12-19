# TutorPro Backend (NestJS + Prisma + PostgreSQL)

## 1) Yêu cầu
- Node.js 20+
- Docker (khuyến nghị) hoặc PostgreSQL local

## 2) Cấu hình
Copy `.env.example` -> `.env` và chỉnh `DATABASE_URL` nếu cần.

## 3) Chạy bằng Docker (nhanh nhất)
```bash
docker compose up -d --build
```

Migrate & seed (chạy lần đầu):
```bash
docker compose exec api npx prisma migrate dev --name init
docker compose exec api npm run seed
```

API:
- Base URL: `http://localhost:3000/api`
- Swagger: `http://localhost:3000/docs`

Tài khoản seed:
- admin: `admin@tutorpro.local` / `Password@123`
- staff: `staff@tutorpro.local` / `Password@123`
- parent: `parent@tutorpro.local` / `Password@123`
- tutor: `tutor@tutorpro.local` / `Password@123`

## 4) Chạy local (không Docker)
```bash
npm i
npx prisma generate
npx prisma migrate dev --name init
npm run seed
npm run dev
```

## 5) Mapping theo SRS (bảng dữ liệu)
Các bảng cốt lõi được triển khai theo file SRS:
- User, Log, Staff, Parent, Tutor, Class, Payment, Complaints, Contract, Session, Application, Student, StudentClass.
