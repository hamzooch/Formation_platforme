import { PrismaService } from "../../prisma/prisma.service";
import { NotificationsService } from "../notifications/notifications.service";
export declare class UsersService {
    private readonly prisma;
    private readonly notifications;
    constructor(prisma: PrismaService, notifications: NotificationsService);
    listUsers(filters?: {
        search?: string;
        role?: "ADMIN" | "TRAINER" | "STUDENT";
        status?: "ACTIVE" | "BLOCKED" | "PENDING";
        page?: number;
        pageSize?: number;
    }): Promise<{
        users: {
            id: string;
            createdAt: Date;
            name: string;
            email: string;
            role: import(".prisma/client").$Enums.UserRole;
            status: import(".prisma/client").$Enums.UserStatus;
        }[];
        page: number;
        pageSize: number;
        total: number;
    }>;
    updateStatus(id: string, status: "active" | "blocked" | "pending"): Promise<{
        message: string;
        user: {
            id: string;
            status: import(".prisma/client").$Enums.UserStatus;
        };
    }>;
}
