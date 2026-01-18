export declare class CoursesService {
    private courses;
    createCourse(body: {
        title: string;
        description: string;
        categoryId?: string;
    }): {
        id: string;
        title: string;
        description: string;
        categoryId: string | undefined;
        status: "PUBLISHED";
    };
    listCourses(): {
        id: string;
        title: string;
        description: string;
        categoryId?: string;
        status: "PUBLISHED" | "DRAFT";
    }[];
    getCourse(id: string): {
        id: string;
        title: string;
        description: string;
        categoryId?: string;
        status: "PUBLISHED" | "DRAFT";
    } | null;
    updateCourse(id: string, body: Record<string, unknown>): {
        id: string;
        title: string;
        description: string;
        categoryId?: string;
        status: "PUBLISHED" | "DRAFT";
    } | null;
    deleteCourse(id: string): {
        deleted: boolean;
    };
}
