import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CourseModulesService } from "./course-modules.service";

@Controller("courses/:courseId/modules")
export class CourseModulesController {
  constructor(private readonly courseModulesService: CourseModulesService) {}

  @Post()
  createModule(
    @Param("courseId") courseId: string,
    @Body() body: { title: string; order: number },
  ) {
    return this.courseModulesService.createModule(courseId, body);
  }

  @Get()
  listModules(@Param("courseId") courseId: string) {
    return this.courseModulesService.listModules(courseId);
  }
}
