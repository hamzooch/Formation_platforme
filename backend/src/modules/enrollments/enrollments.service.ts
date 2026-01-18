import { Injectable } from "@nestjs/common";

@Injectable()
export class EnrollmentsService {
  enroll(courseId: string) {
    return { message: "enroll stub", courseId };
  }

  listEnrollments() {
    return { message: "list enrollments stub" };
  }
}
