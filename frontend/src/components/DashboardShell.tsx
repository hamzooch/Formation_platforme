"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { clearSession, getSession } from "../lib/auth";
import { ToastHost } from "./ToastHost";
import { createSocket, NotificationPayload } from "../lib/realtime";

type DashboardRole = "ADMIN" | "TRAINER" | "STUDENT";

type NavItem = {
  label: string;
  href: string;
};

type DashboardShellProps = {
  title: string;
  subtitle: string;
  accent: string;
  role: DashboardRole;
  children: React.ReactNode;
};

const NAV_ITEMS: Record<DashboardRole, NavItem[]> = {
  ADMIN: [
    { label: "Vue generale", href: "/admin" },
    { label: "Utilisateurs", href: "/admin/users" },
    { label: "Formations", href: "/admin/courses" },
    { label: "Categories", href: "/admin/categories" },
    { label: "Moderation", href: "/admin/moderation" },
    { label: "Statistiques", href: "/admin" },
    { label: "Parametres", href: "/admin/settings" },
  ],
  TRAINER: [
    { label: "Vue generale", href: "/trainer" },
    { label: "Mes formations", href: "/trainer/courses" },
    { label: "Apprenants", href: "/trainer/learners" },
    { label: "Progression", href: "/trainer/progress" },
    { label: "Revenus", href: "/trainer/revenue" },
    { label: "Ressources", href: "/trainer/resources" },
    { label: "Parametres", href: "/trainer/settings" },
  ],
  STUDENT: [
    { label: "Vue generale", href: "/student" },
    { label: "Mes formations", href: "/student/courses" },
    { label: "Progression", href: "/student/progress" },
    { label: "Certifications", href: "/student/certificates" },
    { label: "Favoris", href: "/student/favorites" },
    { label: "Support", href: "/student/support" },
    { label: "Parametres", href: "/student/settings" },
  ],
};

export function DashboardShell({ title, subtitle, accent, role, children }: DashboardShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const items = NAV_ITEMS[role];
  const [open, setOpen] = useState(false);
  const [sessionName, setSessionName] = useState("Utilisateur");
  const [sessionEmail, setSessionEmail] = useState("");
  const [unread, setUnread] = useState(0);
  const initials = useMemo(() => {
    return sessionName
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  }, [sessionName]);

  useEffect(() => {
    const session = getSession();
    if (session?.user) {
      setSessionName(session.user.name);
      setSessionEmail(session.user.email);
    }
  }, []);

  useEffect(() => {
    const socket = createSocket();
    socket.on("notification", (payload: NotificationPayload) => {
      const session = getSession();
      if (payload.role && session?.user.role !== payload.role) {
        return;
      }
      setUnread((prev) => prev + 1);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  function handleLogout() {
    clearSession();
    router.replace("/login");
  }

  return (
    <main className="min-h-screen bg-cream text-ink">
      <ToastHost />
      <div className="grid min-h-screen lg:grid-cols-[260px,1fr]">
        <aside className="border-r border-ink/10 bg-white/80 px-6 py-10">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-accent" />
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted">DigitechPro</p>
              <p className="text-sm font-semibold">{accent}</p>
            </div>
          </div>
          <nav className="mt-8 grid gap-1 text-sm">
            {items.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={
                    isActive
                      ? "rounded-xl bg-ink px-3 py-2 text-white"
                      : "rounded-xl px-3 py-2 text-muted hover:bg-ink/5"
                  }
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="mt-10 rounded-2xl bg-[#161310] p-4 text-[#f5efe6]">
            <p className="text-xs uppercase tracking-[0.3em] text-white/70">Astuce</p>
            <p className="mt-2 text-sm">Utilisez les filtres pour suivre les actions prioritaires.</p>
          </div>
        </aside>

        <section className="px-6 pb-16 pt-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-muted">{accent}</p>
              <h1 className="mt-2 text-3xl font-semibold">{title}</h1>
              <p className="mt-2 text-sm text-muted">{subtitle}</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="hidden items-center gap-2 rounded-xl border border-ink/10 px-3 py-2 text-sm text-muted md:flex">
                <span className="h-2 w-2 rounded-full bg-accent" />
                <span>Recherche rapide</span>
              </div>
              <button className="rounded-xl border border-ink/15 px-4 py-2 text-sm font-semibold">
                Exporter
              </button>
              <button className="rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-white">
                Nouvelle action
              </button>
              <button
                className="relative flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 bg-white"
                onClick={() => setUnread(0)}
                aria-label="Notifications"
              >
                <span className="h-4 w-4 rounded-full border-2 border-ink/60" />
                {unread > 0 ? (
                  <span className="absolute -right-1 -top-1 rounded-full bg-accent px-1 text-[10px] font-semibold text-white">
                    {unread > 9 ? "9+" : unread}
                  </span>
                ) : null}
              </button>
              <div className="relative">
                <button
                  className="flex items-center gap-2 rounded-full border border-ink/10 bg-white px-2 py-1"
                  onClick={() => setOpen((prev) => !prev)}
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-sm font-semibold text-white">
                    {initials || "DP"}
                  </span>
                  <span className="hidden text-sm font-semibold md:inline">{sessionName}</span>
                </button>
                {open ? (
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-ink/10 bg-white p-4 shadow-soft">
                    <p className="text-sm font-semibold">{sessionName}</p>
                    <p className="text-xs text-muted">{sessionEmail || "Compte mock"}</p>
                    <button
                      className="mt-4 w-full rounded-xl border border-ink/15 px-3 py-2 text-xs font-semibold"
                      onClick={handleLogout}
                    >
                      Deconnexion
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-6">{children}</div>
        </section>
      </div>
    </main>
  );
}
