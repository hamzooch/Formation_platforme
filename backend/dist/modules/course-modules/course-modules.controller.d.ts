import { CourseModulesService } from "./course-modules.service";
export declare class CourseModulesController {
    private readonly courseModulesService;
    constructor(courseModulesService: CourseModulesService);
    createModule(courseId: string, body: {
        title: string;
        order: number;
    }): {
        id: string;
        courseId: string;
        title: string;
        order: number;
    };
    listModules(courseId: string): {
        id: string;
        courseId: string;
        title: string;
        order: number;
    }[];
}
