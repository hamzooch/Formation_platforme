export declare class CoursesService {
    createCourse(body: {
        title: string;
        description: string;
        categoryId: string;
    }): {
        message: string;
        body: {
            title: string;
            description: string;
            categoryId: string;
        };
    };
    listCourses(): {
        message: string;
    };
    getCourse(id: string): {
        message: string;
        id: string;
    };
    updateCourse(id: string, body: Record<string, unknown>): {
        message: string;
        id: string;
        body: Record<string, unknown>;
    };
    deleteCourse(id: string): {
        message: string;
        id: string;
    };
}
