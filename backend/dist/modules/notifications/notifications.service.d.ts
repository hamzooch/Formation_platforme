import { PrismaService } from "../../prisma/prisma.service";
import { NotificationsGateway } from "./notifications.gateway";
export declare class NotificationsService {
    private readonly prisma;
    private readonly gateway;
    private readonly logger;
    constructor(prisma: PrismaService, gateway: NotificationsGateway);
    listNotifications(): Promise<{
        notifications: {
            id: string;
            userId: string;
            type: string;
            title: string;
            body: string;
            readAt: Date | null;
            createdAt: Date;
        }[];
    }>;
    markRead(id: string): Promise<{
        notification: {
            id: string;
            userId: string;
            type: string;
            title: string;
            body: string;
            readAt: Date | null;
            createdAt: Date;
        };
    }>;
    pushToAdmin(title: string, body: string): Promise<void>;
    pushToRole(role: "ADMIN" | "TRAINER" | "STUDENT", title: string, body: string): Promise<void>;
}
