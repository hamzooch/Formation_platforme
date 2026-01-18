"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoursesService = void 0;
const common_1 = require("@nestjs/common");
let CoursesService = class CoursesService {
    constructor() {
        this.courses = [
            {
                id: "course_test_001",
                title: "Formation Test DigitechPro",
                description: "Cours de demonstration pour valider l'interface.",
                categoryId: "cat_test",
                status: "PUBLISHED",
            },
        ];
    }
    createCourse(body) {
        const course = {
            id: `course_${Date.now()}`,
            title: body.title,
            description: body.description,
            categoryId: body.categoryId,
            status: "PUBLISHED",
        };
        this.courses.unshift(course);
        return course;
    }
    listCourses() {
        return this.courses;
    }
    getCourse(id) {
        return this.courses.find((course) => course.id === id) ?? null;
    }
    updateCourse(id, body) {
        const course = this.courses.find((item) => item.id === id);
        if (!course) {
            return null;
        }
        Object.assign(course, body);
        return course;
    }
    deleteCourse(id) {
        this.courses = this.courses.filter((item) => item.id !== id);
        return { deleted: true };
    }
};
exports.CoursesService = CoursesService;
exports.CoursesService = CoursesService = __decorate([
    (0, common_1.Injectable)()
], CoursesService);
//# sourceMappingURL=courses.service.js.map