import { NotificationsService } from "../notifications/notifications.service";
export declare class EnrollmentsService {
    private readonly notifications;
    constructor(notifications: NotificationsService);
    private enrollments;
    enroll(courseId: string, userId: string): {
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
    listByCourse(courseId: string): {
        id: string;
        courseId: string;
        userId: string;
        status: "PENDING" | "APPROVED" | "REJECTED";
        createdAt: string;
    }[];
    updateStatus(id: string, status: "APPROVED" | "REJECTED"): {
        id: string;
        courseId: string;
        userId: string;
        status: "PENDING" | "APPROVED" | "REJECTED";
        createdAt: string;
    } | null;
}
