import { LessonsService } from "./lessons.service";
export declare class LessonsController {
    private readonly lessonsService;
    constructor(lessonsService: LessonsService);
    createLesson(body: {
        title: string;
        type: "video" | "document";
        order: number;
    }): {
        message: string;
        body: {
            title: string;
            type: "video" | "document";
            order: number;
        };
    };
}
