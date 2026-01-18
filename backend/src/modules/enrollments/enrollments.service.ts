import { Injectable } from "@nestjs/common";
import { NotificationsService } from "../notifications/notifications.service";

@Injectable()
export class EnrollmentsService {
  constructor(private readonly notifications: NotificationsService) {}
  private enrollments: Array<{
    id: string;
    courseId: string;
    userId: string;
    status: "PENDING" | "APPROVED" | "REJECTED";
    createdAt: string;
  }> = [];

  enroll(courseId: string, userId: string) {
    const existing = this.enrollments.find(
      (item) => item.courseId === courseId && item.userId === userId,
    );
    if (existing) {
      return { message: "already enrolled", enrollment: existing };
    }
    const enrollment = {
      id: `enroll_${Date.now()}`,
      courseId,
      userId,
      status: "PENDING" as const,
      createdAt: new Date().toISOString(),
    };
    this.enrollments.push(enrollment);
    this.notifications.pushToRole(
      "TRAINER",
      "Nouvelle inscription",
      `Demande d'inscription pour le cours ${courseId}.`,
    );
    return { message: "pending approval", enrollment };
  }

  listEnrollments() {
    return { enrollments: this.enrollments };
  }

  listByCourse(courseId: string) {
    return this.enrollments.filter((item) => item.courseId === courseId);
  }

  updateStatus(id: string, status: "APPROVED" | "REJECTED") {
    const enrollment = this.enrollments.find((item) => item.id === id);
    if (!enrollment) {
      return null;
    }
    enrollment.status = status;
    return enrollment;
  }
}
