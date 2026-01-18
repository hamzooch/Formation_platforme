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

@Module({
  imports: [
    AuthModule,
    UsersModule,
    CoursesModule,
    CourseModulesModule,
    LessonsModule,
    EnrollmentsModule,
    ProgressModule,
    NotificationsModule,
    MediaModule,
  ],
})
export class AppModule {}
