import { Injectable } from "@nestjs/common";

@Injectable()
export class LessonsService {
  createLesson(body: { title: string; type: "video" | "document"; order: number }) {
    return { message: "create lesson stub", body };
  }
}
