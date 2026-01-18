import { io, Socket } from "socket.io-client";

export type NotificationPayload = {
  title: string;
  detail: string;
  role?: "ADMIN" | "TRAINER" | "STUDENT";
};

let socket: Socket | null = null;

export function getSocket(): Socket {
  if (!socket) {
    socket = io("http://localhost:4000", {
      transports: ["polling", "websocket"],
      autoConnect: false,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });
  }
  return socket;
}

export function connectSocket(): Socket {
  const instance = getSocket();
  if (!instance.connected && !instance.active) {
    instance.connect();
  }
  return instance;
}
