import { CourseModulesService } from "./course-modules.service";
export declare class CourseModulesController {
    private readonly courseModulesService;
    constructor(courseModulesService: CourseModulesService);
    createModule(body: {
        title: string;
        order: number;
    }): {
        message: string;
        body: {
            title: string;
            order: number;
        };
    };
}
