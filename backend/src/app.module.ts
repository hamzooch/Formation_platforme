import { Module } from "@nestjs/common";
import { AuthModule } from "./modules/auth/auth.module";
import { UsersModule } from "./modules/users/users.module";
import { CoursesModule } from "./modules/courses/courses.module";
import { CourseModulesModule } from "./modules/course-modules/course-modules.module";
import { LessonsModule } from "./modules/lessons/lessons.module";
import { EnrollmentsModule } from "./modules/enrollments/enrollments.module";
import { ProgressModule } from "./modules/progress/progress.module";
import { NotificationsModule } from "./modules/notifications/notifications.module";
import { MediaModule } from "./modules/media/media.module";
import { DashboardsModule } from "./modules/dashboards/dashboards.module";
import { AdminModule } from "./modules/admin/admin.module";
import { PrismaModule } from "./prisma/prisma.module";
import { SeedModule } from "./modules/seed/seed.module";

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UsersModule,
    CoursesModule,
    CourseModulesModule,
    LessonsModule,
    EnrollmentsModule,
    ProgressModule,
    NotificationsModule,
    MediaModule,
    DashboardsModule,
    AdminModule,
    SeedModule,
  ],
})
export class AppModule {}
