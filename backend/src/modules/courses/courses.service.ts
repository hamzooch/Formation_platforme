import { Injectable } from "@nestjs/common";

@Injectable()
export class CoursesService {
  private courses: Array<{
    id: string;
    title: string;
    description: string;
    categoryId?: string;
    status: "PUBLISHED" | "DRAFT";
  }> = [
    {
      id: "course_test_001",
      title: "Formation Test DigitechPro",
      description: "Cours de demonstration pour valider l'interface.",
      categoryId: "cat_test",
      status: "PUBLISHED",
    },
  ];

  createCourse(body: { title: string; description: string; categoryId?: string }) {
    const course = {
      id: `course_${Date.now()}`,
      title: body.title,
      description: body.description,
      categoryId: body.categoryId,
      status: "PUBLISHED" as const,
    };
    this.courses.unshift(course);
    return course;
  }

  listCourses() {
    return this.courses;
  }

  getCourse(id: string) {
    return this.courses.find((course) => course.id === id) ?? null;
  }

  updateCourse(id: string, body: Record<string, unknown>) {
    const course = this.courses.find((item) => item.id === id);
    if (!course) {
      return null;
    }
    Object.assign(course, body);
    return course;
  }

  deleteCourse(id: string) {
    this.courses = this.courses.filter((item) => item.id !== id);
    return { deleted: true };
  }
}
