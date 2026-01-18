import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { NotificationsGateway } from "./notifications.gateway";

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);
  constructor(
    private readonly prisma: PrismaService,
    private readonly gateway: NotificationsGateway,
  ) {}

  listNotifications() {
    return this.prisma.notification
      .findMany({ orderBy: { createdAt: "desc" }, take: 20 })
      .then((notifications) => ({ notifications }));
  }

  markRead(id: string) {
    return this.prisma.notification
      .update({ where: { id }, data: { readAt: new Date() } })
      .then((notification) => ({ notification }));
  }

  async pushToAdmin(title: string, body: string) {
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
    } catch (error) {
      this.logger.warn("Failed to persist admin notification, broadcasting anyway.");
    }

    this.gateway.broadcast({ title, detail: body, role: "ADMIN" });
  }

  async pushToRole(role: "ADMIN" | "TRAINER" | "STUDENT", title: string, body: string) {
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
    } catch (error) {
      this.logger.warn(`Failed to persist ${role} notification, broadcasting anyway.`);
    }

    this.gateway.broadcast({ title, detail: body, role });
  }
}
