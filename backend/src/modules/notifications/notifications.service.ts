import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { NotificationsGateway } from "./notifications.gateway";

@Injectable()
export class NotificationsService {
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

    await this.prisma.notification.create({
      data: {
        userId: admin.id,
        type: "SYSTEM",
        title,
        body,
      },
    });

    this.gateway.broadcast({ title, detail: body, role: "ADMIN" });
  }

  async pushToRole(role: "ADMIN" | "TRAINER" | "STUDENT", title: string, body: string) {
    const user = await this.prisma.user.findFirst({ where: { role } });
    if (!user) {
      this.gateway.broadcast({ title, detail: body, role });
      return;
    }

    await this.prisma.notification.create({
      data: {
        userId: user.id,
        type: "SYSTEM",
        title,
        body,
      },
    });

    this.gateway.broadcast({ title, detail: body, role });
  }
}
