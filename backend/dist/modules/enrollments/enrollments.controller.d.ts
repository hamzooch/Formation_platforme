import { EnrollmentsService } from "./enrollments.service";
export declare class EnrollmentsController {
    private readonly enrollmentsService;
    constructor(enrollmentsService: EnrollmentsService);
    enroll(courseId: string): {
        message: string;
        courseId: string;
    };
    listEnrollments(): {
        message: string;
    };
}
