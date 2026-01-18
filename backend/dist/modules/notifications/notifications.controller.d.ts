import { NotificationsService } from "./notifications.service";
export declare class NotificationsController {
    private readonly notificationsService;
    constructor(notificationsService: NotificationsService);
    listNotifications(): {
        message: string;
    };
    markRead(id: string): {
        message: string;
        id: string;
    };
}
