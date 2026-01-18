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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const notifications_service_1 = require("../notifications/notifications.service");
let AdminService = class AdminService {
    constructor(prisma, notifications) {
        this.prisma = prisma;
        this.notifications = notifications;
    }
    listCategories(filters) {
        const where = {
            name: filters?.search
                ? {
                    contains: filters.search,
                    mode: "insensitive",
                }
                : undefined,
            active: filters?.active,
        };
        return this.prisma.category
            .findMany({ where, orderBy: { name: "asc" } })
            .then((categories) => ({
            categories: categories.map((category) => ({
                id: category.id,
                name: category.name,
                active: category.active,
            })),
        }));
    }
    createCategory(body) {
        const slug = body.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)+/g, "");
        return this.prisma.category
            .create({ data: { name: body.name, slug } })
            .then(async (category) => {
            await this.notifications.pushToAdmin("Categorie creee", `La categorie ${category.name} est disponible.`);
            return {
                message: "category created",
                category: { id: category.id, name: category.name, active: true },
            };
        });
    }
    updateCategory(body) {
        const name = body.name ?? undefined;
        const slug = name
            ? name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "")
            : undefined;
        return this.prisma.category
            .update({
            where: { id: body.id },
            data: { name, slug, active: body.active },
        })
            .then(async (category) => {
            await this.notifications.pushToAdmin("Categorie mise a jour", `La categorie ${category.name} a ete modifiee.`);
            return {
                message: "category updated",
                category: { id: category.id, name: category.name, active: category.active },
            };
        });
    }
    listReports() {
        return this.prisma.report.findMany({ orderBy: { createdAt: "desc" } }).then((reports) => ({
            reports: reports.map((report) => ({
                id: report.id,
                title: report.title,
                course: report.courseTitle,
                severity: report.severity,
                status: report.status,
            })),
        }));
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        notifications_service_1.NotificationsService])
], AdminService);
//# sourceMappingURL=admin.service.js.map