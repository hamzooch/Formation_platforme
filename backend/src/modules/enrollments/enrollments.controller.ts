import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { EnrollmentsService } from "./enrollments.service";

@Controller("courses/:courseId/enroll")
export class EnrollmentsController {
  constructor(private readonly enrollmentsService: EnrollmentsService) {}

  @Post()
  enroll(
    @Param("courseId") courseId: string,
    @Body() body: { userId: string },
  ) {
    return this.enrollmentsService.enroll(courseId, body.userId);
  }

  @Get()
  listEnrollments() {
    return this.enrollmentsService.listEnrollments();
  }
}

@Controller("courses/:courseId/enrollments")
export class CourseEnrollmentsController {
  constructor(private readonly enrollmentsService: EnrollmentsService) {}

  @Get()
  listForCourse(@Param("courseId") courseId: string) {
    return { enrollments: this.enrollmentsService.listByCourse(courseId) };
  }
}

@Controller("enrollments")
export class EnrollmentActionsController {
  constructor(private readonly enrollmentsService: EnrollmentsService) {}

  @Patch(":id/status")
  updateStatus(@Param("id") id: string, @Body() body: { status: "APPROVED" | "REJECTED" }) {
    return { enrollment: this.enrollmentsService.updateStatus(id, body.status) };
  }
}
