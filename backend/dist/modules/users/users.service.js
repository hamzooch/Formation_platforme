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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const notifications_service_1 = require("../notifications/notifications.service");
let UsersService = class UsersService {
    constructor(prisma, notifications) {
        this.prisma = prisma;
        this.notifications = notifications;
    }
    listUsers(filters) {
        const pageSize = Math.max(1, Math.min(filters?.pageSize ?? 10, 50));
        const page = Math.max(1, filters?.page ?? 1);
        const skip = (page - 1) * pageSize;
        const where = {
            role: filters?.role,
            status: filters?.status,
            OR: filters?.search
                ? [
                    { name: { contains: filters.search, mode: "insensitive" } },
                    { email: { contains: filters.search, mode: "insensitive" } },
                ]
                : undefined,
        };
        return Promise.all([
            this.prisma.user.count({ where }),
            this.prisma.user.findMany({
                where,
                orderBy: { createdAt: "desc" },
                skip,
                take: pageSize,
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                    status: true,
                    createdAt: true,
                },
            }),
        ]).then(([total, users]) => ({
            users,
            page,
            pageSize,
            total,
        }));
    }
    updateStatus(id, status) {
        return this.prisma.user
            .update({
            where: { id },
            data: { status: status.toUpperCase() },
            select: { id: true, status: true },
        })
            .then(async (user) => {
            await this.notifications.pushToAdmin("Mise a jour utilisateur", `Le statut utilisateur est passe a ${user.status}.`);
            return { message: "status updated", user };
        });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        notifications_service_1.NotificationsService])
], UsersService);
//# sourceMappingURL=users.service.js.map