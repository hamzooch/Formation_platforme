import { io, Socket } from "socket.io-client";

export type NotificationPayload = {
  title: string;
  detail: string;
  role?: "ADMIN" | "TRAINER" | "STUDENT";
};

export function createSocket(): Socket {
  return io("http://localhost:4000", {
    transports: ["websocket"],
  });
}
