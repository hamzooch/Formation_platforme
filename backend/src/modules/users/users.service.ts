import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { NotificationsService } from "../notifications/notifications.service";

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notifications: NotificationsService,
  ) {}

  listUsers(filters?: {
    search?: string;
    role?: "ADMIN" | "TRAINER" | "STUDENT";
    status?: "ACTIVE" | "BLOCKED" | "PENDING";
    page?: number;
    pageSize?: number;
  }) {
    const pageSize = Math.max(1, Math.min(filters?.pageSize ?? 10, 50));
    const page = Math.max(1, filters?.page ?? 1);
    const skip = (page - 1) * pageSize;

    const where = {
      role: filters?.role,
      status: filters?.status,
      OR: filters?.search
        ? [
            { name: { contains: filters.search, mode: "insensitive" as const } },
            { email: { contains: filters.search, mode: "insensitive" as const } },
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

  updateStatus(id: string, status: "active" | "blocked" | "pending") {
    return this.prisma.user
      .update({
        where: { id },
        data: { status: status.toUpperCase() as "ACTIVE" | "BLOCKED" | "PENDING" },
        select: { id: true, status: true },
      })
      .then(async (user) => {
        await this.notifications.pushToAdmin(
          "Mise a jour utilisateur",
          `Le statut utilisateur est passe a ${user.status}.`,
        );

        return { message: "status updated", user };
      });
  }
}
