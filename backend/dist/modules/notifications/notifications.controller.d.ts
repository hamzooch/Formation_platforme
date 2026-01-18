import { NotificationsService } from "./notifications.service";
export declare class NotificationsController {
    private readonly notificationsService;
    constructor(notificationsService: NotificationsService);
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
}
