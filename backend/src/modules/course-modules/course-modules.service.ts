import { Injectable } from "@nestjs/common";

@Injectable()
export class CourseModulesService {
  createModule(body: { title: string; order: number }) {
    return { message: "create module stub", body };
  }
}
