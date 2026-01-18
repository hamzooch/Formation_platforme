export declare class LessonsService {
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
