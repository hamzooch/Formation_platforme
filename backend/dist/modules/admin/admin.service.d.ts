import { PrismaService } from "../../prisma/prisma.service";
import { NotificationsService } from "../notifications/notifications.service";
export declare class AdminService {
    private readonly prisma;
    private readonly notifications;
    constructor(prisma: PrismaService, notifications: NotificationsService);
    listCategories(filters?: {
        search?: string;
        active?: boolean;
    }): Promise<{
        categories: {
            id: string;
            name: string;
            active: boolean;
        }[];
    }>;
    createCategory(body: {
        name: string;
    }): Promise<{
        message: string;
        category: {
            id: string;
            name: string;
            active: boolean;
        };
    }>;
    updateCategory(body: {
        id: string;
        name?: string;
        active?: boolean;
    }): Promise<{
        message: string;
        category: {
            id: string;
            name: string;
            active: boolean;
        };
    }>;
    listReports(): Promise<{
        reports: {
            id: string;
            title: string;
            course: string;
            severity: string;
            status: string;
        }[];
    }>;
}
