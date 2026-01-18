import { Injectable } from "@nestjs/common";

@Injectable()
export class CourseModulesService {
  private modules: Array<{ id: string; courseId: string; title: string; order: number }> = [];

  createModule(courseId: string, body: { title: string; order: number }) {
    const module = {
      id: `module_${Date.now()}`,
      courseId,
      title: body.title,
      order: body.order,
    };
    this.modules.push(module);
    return module;
  }

  listModules(courseId: string) {
    return this.modules.filter((item) => item.courseId === courseId);
  }
}
