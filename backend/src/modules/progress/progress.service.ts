import { Injectable } from "@nestjs/common";

@Injectable()
export class ProgressService {
  updateProgress(lessonId: string, body: { completed: boolean; watchedSeconds?: number }) {
    return { message: "update progress stub", lessonId, body };
  }

  getCourseProgress(courseId: string) {
    return { message: "get course progress stub", courseId };
  }
}
