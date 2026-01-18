export declare class CourseModulesService {
    private modules;
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
