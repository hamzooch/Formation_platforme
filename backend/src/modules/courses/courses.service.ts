import { Injectable } from "@nestjs/common";

@Injectable()
export class CoursesService {
  createCourse(body: { title: string; description: string; categoryId: string }) {
    return { message: "create course stub", body };
  }

  listCourses() {
    return { message: "list courses stub" };
  }

  getCourse(id: string) {
    return { message: "get course stub", id };
  }

  updateCourse(id: string, body: Record<string, unknown>) {
    return { message: "update course stub", id, body };
  }

  deleteCourse(id: string) {
    return { message: "delete course stub", id };
  }
}
