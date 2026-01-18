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
var NotificationsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const notifications_gateway_1 = require("./notifications.gateway");
let NotificationsService = NotificationsService_1 = class NotificationsService {
    constructor(prisma, gateway) {
        this.prisma = prisma;
        this.gateway = gateway;
        this.logger = new common_1.Logger(NotificationsService_1.name);
    }
    listNotifications() {
        return this.prisma.notification
            .findMany({ orderBy: { createdAt: "desc" }, take: 20 })
            .then((notifications) => ({ notifications }));
    }
    markRead(id) {
        return this.prisma.notification
            .update({ where: { id }, data: { readAt: new Date() } })
            .then((notification) => ({ notification }));
    }
    async pushToAdmin(title, body) {
        const admin = await this.prisma.user.findFirst({ where: { role: "ADMIN" } });
        if (!admin) {
            this.gateway.broadcast({ title, detail: body, role: "ADMIN" });
            return;
        }
        try {
            await this.prisma.notification.create({
                data: {
                    userId: admin.id,
                    type: "SYSTEM",
                    title,
                    body,
                },
            });
        }
        catch (error) {
            this.logger.warn("Failed to persist admin notification, broadcasting anyway.");
        }
        this.gateway.broadcast({ title, detail: body, role: "ADMIN" });
    }
    async pushToRole(role, title, body) {
        const user = await this.prisma.user.findFirst({ where: { role } });
        if (!user) {
            this.gateway.broadcast({ title, detail: body, role });
            return;
        }
        try {
            await this.prisma.notification.create({
                data: {
                    userId: user.id,
                    type: "SYSTEM",
                    title,
                    body,
                },
            });
        }
        catch (error) {
            this.logger.warn(`Failed to persist ${role} notification, broadcasting anyway.`);
        }
        this.gateway.broadcast({ title, detail: body, role });
    }
};
exports.NotificationsService = NotificationsService;
exports.NotificationsService = NotificationsService = NotificationsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        notifications_gateway_1.NotificationsGateway])
], NotificationsService);
//# sourceMappingURL=notifications.service.js.map