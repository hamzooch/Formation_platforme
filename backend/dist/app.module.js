"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const auth_module_1 = require("./modules/auth/auth.module");
const users_module_1 = require("./modules/users/users.module");
const courses_module_1 = require("./modules/courses/courses.module");
const course_modules_module_1 = require("./modules/course-modules/course-modules.module");
const lessons_module_1 = require("./modules/lessons/lessons.module");
const enrollments_module_1 = require("./modules/enrollments/enrollments.module");
const progress_module_1 = require("./modules/progress/progress.module");
const notifications_module_1 = require("./modules/notifications/notifications.module");
const media_module_1 = require("./modules/media/media.module");
const dashboards_module_1 = require("./modules/dashboards/dashboards.module");
const admin_module_1 = require("./modules/admin/admin.module");
const prisma_module_1 = require("./prisma/prisma.module");
const seed_module_1 = require("./modules/seed/seed.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            courses_module_1.CoursesModule,
            course_modules_module_1.CourseModulesModule,
            lessons_module_1.LessonsModule,
            enrollments_module_1.EnrollmentsModule,
            progress_module_1.ProgressModule,
            notifications_module_1.NotificationsModule,
            media_module_1.MediaModule,
            dashboards_module_1.DashboardsModule,
            admin_module_1.AdminModule,
            seed_module_1.SeedModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map