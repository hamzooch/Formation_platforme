import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { CoursesService } from "./courses.service";

@Controller("courses")
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  createCourse(@Body() body: { title: string; description: string; categoryId: string }) {
    return this.coursesService.createCourse(body);
  }

  @Get()
  listCourses() {
    return this.coursesService.listCourses();
  }

  @Get(":id")
  getCourse(@Param("id") id: string) {
    return this.coursesService.getCourse(id);
  }

  @Patch(":id")
  updateCourse(@Param("id") id: string, @Body() body: Record<string, unknown>) {
    return this.coursesService.updateCourse(id, body);
  }

  @Delete(":id")
  deleteCourse(@Param("id") id: string) {
    return this.coursesService.deleteCourse(id);
  }
}
