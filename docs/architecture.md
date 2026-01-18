# DigitechPro Architecture

## Frontend
- Next.js App Router + Tailwind CSS
- Public pages: home, catalog, course detail
- Dashboards by role: admin, trainer, student

## Backend
- NestJS REST API
- Modules: auth, users, courses, course-modules, lessons, enrollments, progress, notifications, media

## Data Layer
- MongoDB + Prisma
- Media stored in S3-compatible bucket with signed uploads

## Auth
- JWT access + refresh
- Role-based access control
