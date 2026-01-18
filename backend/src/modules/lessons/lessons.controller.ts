import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { LessonsService } from "./lessons.service";

@Controller("modules/:moduleId/lessons")
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Post()
  createLesson(
    @Param("moduleId") moduleId: string,
    @Body()
    body: {
      title: string;
      type: "video" | "document";
      order: number;
      videoUrl?: string;
      docUrl?: string;
    },
  ) {
    return this.lessonsService.createLesson(moduleId, body);
  }

  @Get()
  listLessons(@Param("moduleId") moduleId: string) {
    return this.lessonsService.listLessons(moduleId);
  }
}
