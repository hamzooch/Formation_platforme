import { LessonsService } from "./lessons.service";
export declare class LessonsController {
    private readonly lessonsService;
    constructor(lessonsService: LessonsService);
    createLesson(moduleId: string, body: {
        title: string;
        type: "video" | "document";
        order: number;
        videoUrl?: string;
        docUrl?: string;
    }): {
        id: string;
        moduleId: string;
        title: string;
        type: "video" | "document";
        order: number;
        videoUrl: string | undefined;
        docUrl: string | undefined;
    };
    listLessons(moduleId: string): {
        id: string;
        moduleId: string;
        title: string;
        type: "video" | "document";
        order: number;
        videoUrl?: string;
        docUrl?: string;
    }[];
}
