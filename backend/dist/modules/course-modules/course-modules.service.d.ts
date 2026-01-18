export declare class CourseModulesService {
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
