export declare class ProgressService {
    updateProgress(lessonId: string, body: {
        completed: boolean;
        watchedSeconds?: number;
    }): {
        message: string;
        lessonId: string;
        body: {
            completed: boolean;
            watchedSeconds?: number;
        };
    };
    getCourseProgress(courseId: string): {
        message: string;
        courseId: string;
    };
}
