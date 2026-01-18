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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnrollmentActionsController = exports.CourseEnrollmentsController = exports.EnrollmentsController = void 0;
const common_1 = require("@nestjs/common");
const enrollments_service_1 = require("./enrollments.service");
let EnrollmentsController = class EnrollmentsController {
    constructor(enrollmentsService) {
        this.enrollmentsService = enrollmentsService;
    }
    enroll(courseId, body) {
        return this.enrollmentsService.enroll(courseId, body.userId);
    }
    listEnrollments() {
        return this.enrollmentsService.listEnrollments();
    }
};
exports.EnrollmentsController = EnrollmentsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Param)("courseId")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], EnrollmentsController.prototype, "enroll", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EnrollmentsController.prototype, "listEnrollments", null);
exports.EnrollmentsController = EnrollmentsController = __decorate([
    (0, common_1.Controller)("courses/:courseId/enroll"),
    __metadata("design:paramtypes", [enrollments_service_1.EnrollmentsService])
], EnrollmentsController);
let CourseEnrollmentsController = class CourseEnrollmentsController {
    constructor(enrollmentsService) {
        this.enrollmentsService = enrollmentsService;
    }
    listForCourse(courseId) {
        return { enrollments: this.enrollmentsService.listByCourse(courseId) };
    }
};
exports.CourseEnrollmentsController = CourseEnrollmentsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Param)("courseId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CourseEnrollmentsController.prototype, "listForCourse", null);
exports.CourseEnrollmentsController = CourseEnrollmentsController = __decorate([
    (0, common_1.Controller)("courses/:courseId/enrollments"),
    __metadata("design:paramtypes", [enrollments_service_1.EnrollmentsService])
], CourseEnrollmentsController);
let EnrollmentActionsController = class EnrollmentActionsController {
    constructor(enrollmentsService) {
        this.enrollmentsService = enrollmentsService;
    }
    updateStatus(id, body) {
        return { enrollment: this.enrollmentsService.updateStatus(id, body.status) };
    }
};
exports.EnrollmentActionsController = EnrollmentActionsController;
__decorate([
    (0, common_1.Patch)(":id/status"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], EnrollmentActionsController.prototype, "updateStatus", null);
exports.EnrollmentActionsController = EnrollmentActionsController = __decorate([
    (0, common_1.Controller)("enrollments"),
    __metadata("design:paramtypes", [enrollments_service_1.EnrollmentsService])
], EnrollmentActionsController);
//# sourceMappingURL=enrollments.controller.js.map