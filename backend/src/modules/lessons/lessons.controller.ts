import { Body, Controller, Post } from "@nestjs/common";
import { LessonsService } from "./lessons.service";

@Controller("modules/:moduleId/lessons")
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Post()
  createLesson(
    @Body() body: { title: string; type: "video" | "document"; order: number },
  ) {
    return this.lessonsService.createLesson(body);
  }
}
