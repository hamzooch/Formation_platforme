import { Module } from "@nestjs/common";
import {
  CourseEnrollmentsController,
  EnrollmentActionsController,
  EnrollmentsController,
} from "./enrollments.controller";
import { EnrollmentsService } from "./enrollments.service";
import { NotificationsModule } from "../notifications/notifications.module";

@Module({
  imports: [NotificationsModule],
  controllers: [EnrollmentsController, CourseEnrollmentsController, EnrollmentActionsController],
  providers: [EnrollmentsService],
})
export class EnrollmentsModule {}
