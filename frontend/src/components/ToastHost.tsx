"use client";

import { useEffect, useState } from "react";
import { connectSocket, NotificationPayload } from "../lib/realtime";
import { getSession } from "../lib/auth";

type Toast = NotificationPayload & { id: string };

export function ToastHost() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const socket = connectSocket();
    const handler = (payload: NotificationPayload) => {
      const session = getSession();
      if (payload.role && session?.user.role !== payload.role) {
        return;
      }
      const toast: Toast = { id: `toast_${Date.now()}`, ...payload };
      setToasts((prev) => [toast, ...prev].slice(0, 5));
      setTimeout(() => {
        setToasts((prev) => prev.filter((item) => item.id !== toast.id));
      }, 4500);
    };
    socket.on("notification", handler);

    return () => {
      socket.off("notification", handler);
    };
  }, []);

  if (toasts.length === 0) {
    return null;
  }

  return (
    <div className="fixed right-6 top-6 z-50 grid gap-3">
      {toasts.map((toast) => (
        <div key={toast.id} className="w-72 rounded-2xl border border-ink/10 bg-white p-4 shadow-soft">
          <p className="text-sm font-semibold">{toast.title}</p>
          <p className="mt-1 text-xs text-muted">{toast.detail}</p>
          <button
            className="mt-3 text-xs font-semibold text-ink/60"
            onClick={() => setToasts((prev) => prev.filter((item) => item.id !== toast.id))}
          >
            Fermer
          </button>
        </div>
      ))}
    </div>
  );
}
