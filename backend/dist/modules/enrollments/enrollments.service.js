"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnrollmentsService = void 0;
const common_1 = require("@nestjs/common");
const notifications_service_1 = require("../notifications/notifications.service");
let EnrollmentsService = class EnrollmentsService {
    constructor(notifications) {
        this.notifications = notifications;
        this.enrollments = [];
    }
    enroll(courseId, userId) {
        const existing = this.enrollments.find((item) => item.courseId === courseId && item.userId === userId);
        if (existing) {
            return { message: "already enrolled", enrollment: existing };
        }
        const enrollment = {
            id: `enroll_${Date.now()}`,
            courseId,
            userId,
            status: "PENDING",
            createdAt: new Date().toISOString(),
        };
        this.enrollments.push(enrollment);
        this.notifications
            .pushToRole("TRAINER", "Nouvelle inscription", `Demande d'inscription pour le cours ${courseId}.`)
            .catch(() => undefined);
        return { message: "pending approval", enrollment };
    }
    listEnrollments() {
        return { enrollments: this.enrollments };
    }
    listByCourse(courseId) {
        return this.enrollments.filter((item) => item.courseId === courseId);
    }
    updateStatus(id, status) {
        const enrollment = this.enrollments.find((item) => item.id === id);
        if (!enrollment) {
            return null;
        }
        enrollment.status = status;
        return enrollment;
    }
};
exports.EnrollmentsService = EnrollmentsService;
exports.EnrollmentsService = EnrollmentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [notifications_service_1.NotificationsService])
], EnrollmentsService);
//# sourceMappingURL=enrollments.service.js.map