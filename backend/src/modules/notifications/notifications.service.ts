import { Injectable } from "@nestjs/common";

@Injectable()
export class NotificationsService {
  listNotifications() {
    return { message: "list notifications stub" };
  }

  markRead(id: string) {
    return { message: "mark read stub", id };
  }
}
