import { Body, Controller, Post } from "@nestjs/common";
import { CourseModulesService } from "./course-modules.service";

@Controller("courses/:courseId/modules")
export class CourseModulesController {
  constructor(private readonly courseModulesService: CourseModulesService) {}

  @Post()
  createModule(@Body() body: { title: string; order: number }) {
    return this.courseModulesService.createModule(body);
  }
}
