import { EnrollmentsService } from "./enrollments.service";
export declare class EnrollmentsController {
    private readonly enrollmentsService;
    constructor(enrollmentsService: EnrollmentsService);
    enroll(courseId: string, body: {
        userId: string;
    }): {
        message: string;
        enrollment: {
            id: string;
            courseId: string;
            userId: string;
            status: "PENDING" | "APPROVED" | "REJECTED";
            createdAt: string;
        };
    };
    listEnrollments(): {
        enrollments: {
            id: string;
            courseId: string;
            userId: string;
            status: "PENDING" | "APPROVED" | "REJECTED";
            createdAt: string;
        }[];
    };
}
export declare class CourseEnrollmentsController {
    private readonly enrollmentsService;
    constructor(enrollmentsService: EnrollmentsService);
    listForCourse(courseId: string): {
        enrollments: {
            id: string;
            courseId: string;
            userId: string;
            status: "PENDING" | "APPROVED" | "REJECTED";
            createdAt: string;
        }[];
    };
}
export declare class EnrollmentActionsController {
    private readonly enrollmentsService;
    constructor(enrollmentsService: EnrollmentsService);
    updateStatus(id: string, body: {
        status: "APPROVED" | "REJECTED";
    }): {
        enrollment: {
            id: string;
            courseId: string;
            userId: string;
            status: "PENDING" | "APPROVED" | "REJECTED";
            createdAt: string;
        } | null;
    };
}
