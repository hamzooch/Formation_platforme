import { Injectable } from "@nestjs/common";

@Injectable()
export class LessonsService {
  private lessons: Array<{
    id: string;
    moduleId: string;
    title: string;
    type: "video" | "document";
    order: number;
    videoUrl?: string;
    docUrl?: string;
  }> = [];

  createLesson(
    moduleId: string,
    body: { title: string; type: "video" | "document"; order: number; videoUrl?: string; docUrl?: string },
  ) {
    const lesson = {
      id: `lesson_${Date.now()}`,
      moduleId,
      title: body.title,
      type: body.type,
      order: body.order,
      videoUrl: body.videoUrl,
      docUrl: body.docUrl,
    };
    this.lessons.push(lesson);
    return lesson;
  }

  listLessons(moduleId: string) {
    return this.lessons.filter((item) => item.moduleId === moduleId);
  }
}
