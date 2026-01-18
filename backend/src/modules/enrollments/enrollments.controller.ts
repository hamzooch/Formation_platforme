import { Controller, Get, Param, Post } from "@nestjs/common";
import { EnrollmentsService } from "./enrollments.service";

@Controller("courses/:courseId/enroll")
export class EnrollmentsController {
  constructor(private readonly enrollmentsService: EnrollmentsService) {}

  @Post()
  enroll(@Param("courseId") courseId: string) {
    return this.enrollmentsService.enroll(courseId);
  }

  @Get()
  listEnrollments() {
    return this.enrollmentsService.listEnrollments();
  }
}
