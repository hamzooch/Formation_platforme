import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";

@WebSocketGateway({
  cors: {
    origin: ["http://127.0.0.1:3000", "http://localhost:3000"],
    credentials: true,
  },
})
export class NotificationsGateway {
  @WebSocketServer()
  server!: Server;

  broadcast(payload: { title: string; detail: string; role?: string }) {
    this.server.emit("notification", payload);
  }
}
