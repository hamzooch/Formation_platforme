# DigitechPro API

Base: `/api`

## Auth
- POST `/auth/register`
- POST `/auth/login`
- POST `/auth/refresh`

## Users (Admin)
- GET `/admin/users`
- PATCH `/admin/users/:id/status`

## Courses
- POST `/courses`
- GET `/courses`
- GET `/courses/:id`
- PATCH `/courses/:id`
- DELETE `/courses/:id`

## Modules & Lessons
- POST `/courses/:courseId/modules`
- POST `/modules/:moduleId/lessons`

## Enrollment
- POST `/courses/:courseId/enroll`
- GET `/courses/:courseId/enroll`

## Progress
- POST `/lessons/:lessonId/progress`
- GET `/lessons/:lessonId/progress/course/:courseId`

## Media
- POST `/media/upload-url`

## Notifications
- GET `/notifications`
- PATCH `/notifications/:id/read`

