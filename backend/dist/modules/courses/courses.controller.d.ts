import { CoursesService } from "./courses.service";
export declare class CoursesController {
    private readonly coursesService;
    constructor(coursesService: CoursesService);
    createCourse(body: {
        title: string;
        description: string;
        categoryId: string;
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
