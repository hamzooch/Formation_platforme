import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ProgressService } from "./progress.service";

@Controller("lessons/:lessonId/progress")
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  @Post()
  updateProgress(
    @Param("lessonId") lessonId: string,
    @Body() body: { completed: boolean; watchedSeconds?: number },
  ) {
    return this.progressService.updateProgress(lessonId, body);
  }

  @Get("/course/:courseId")
  getCourseProgress(@Param("courseId") courseId: string) {
    return this.progressService.getCourseProgress(courseId);
  }
}
