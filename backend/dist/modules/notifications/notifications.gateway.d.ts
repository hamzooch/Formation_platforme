import { Server } from "socket.io";
export declare class NotificationsGateway {
    server: Server;
    broadcast(payload: {
        title: string;
        detail: string;
        role?: string;
    }): void;
}
