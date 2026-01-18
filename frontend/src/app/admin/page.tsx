"use client";

import { useEffect, useMemo, useState } from "react";
import { DashboardShell } from "../../components/DashboardShell";
import { AuthGuard } from "../../components/AuthGuard";
import { apiGet } from "../../lib/api";
import { connectSocket, NotificationPayload } from "../../lib/realtime";
import {
  AdminCategory,
  AdminReport,
  AdminUser,
  UsersResponse,
  fetchCategories,
  fetchReports,
  fetchUsers,
} from "../../lib/admin-api";

type AdminPayload = {
  stats: { label: string; value: string }[];
  alerts: { title: string; detail: string; tag: string }[];
  overview: { label: string; value: string }[];
  activity: { title: string; detail: string; time: string }[];
  notifications: { title: string; detail: string }[];
};

export default function AdminDashboard() {
  const [data, setData] = useState<AdminPayload | null>(null);
  const [usersPayload, setUsersPayload] = useState<UsersResponse | null>(null);
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [reports, setReports] = useState<AdminReport[]>([]);
  const [liveNotifications, setLiveNotifications] = useState<NotificationPayload[]>([]);
  const [userSearch, setUserSearch] = useState("");
  const [userRole, setUserRole] = useState("");
  const [userStatus, setUserStatus] = useState("");
  const [userPage, setUserPage] = useState(1);
  const [categorySearch, setCategorySearch] = useState("");
  const [categoryActive, setCategoryActive] = useState("");

  useEffect(() => {
    apiGet<AdminPayload>("/dashboard/admin")
      .then(setData)
      .catch(() => setData(null));
  }, []);

  useEffect(() => {
    if (data?.notifications) {
      setLiveNotifications(data.notifications);
    }
  }, [data]);

  useEffect(() => {
    fetchUsers({
      search: userSearch || undefined,
      role: userRole || undefined,
      status: userStatus || undefined,
      page: userPage,
      pageSize: 6,
    })
      .then(setUsersPayload)
      .catch(() => setUsersPayload(null));
  }, [userSearch, userRole, userStatus, userPage]);

  useEffect(() => {
    fetchCategories({
      search: categorySearch || undefined,
      active: categoryActive || undefined,
    })
      .then((payload) => setCategories(payload.categories))
      .catch(() => setCategories([]));
  }, [categorySearch, categoryActive]);

  useEffect(() => {
    fetchReports().then((payload) => setReports(payload.reports)).catch(() => setReports([]));
  }, []);

  useEffect(() => {
    const socket = connectSocket();
    const handleNotification = (payload: NotificationPayload) => {
      setLiveNotifications((prev) => [payload, ...prev].slice(0, 6));
    };
    socket.on("notification", handleNotification);
    return () => {
      socket.off("notification", handleNotification);
    };
  }, []);

  const stats = data?.stats ?? [];
  const alerts = data?.alerts ?? [];
  const overview = data?.overview ?? [];
  const activity = data?.activity ?? [];
  const notifications = liveNotifications;
  const users = usersPayload?.users ?? [];
  const totalPages = usersPayload ? Math.ceil(usersPayload.total / usersPayload.pageSize) : 1;

  const pendingTrainers = useMemo(
    () => users.filter((user) => user.role === "TRAINER" && user.status === "PENDING"),
    [users],
  );

  return (
    <AuthGuard role="ADMIN">
      <DashboardShell
        title="Dashboard Administrateur"
        subtitle="Pilotez la plateforme DigitechPro en temps reel."
        accent="Admin"
        role="ADMIN"
      >
        <section className="grid gap-4 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl bg-white p-5 shadow-soft">
              <p className="text-xs uppercase tracking-[0.2em] text-muted">{stat.label}</p>
              <p className="mt-3 text-2xl font-semibold">{stat.value}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[2fr,1fr]">
          <div className="rounded-3xl bg-white p-6 shadow-soft">
            <h2 className="text-lg font-semibold">Vue globale</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {overview.map((item) => (
                <div key={item.label} className="rounded-2xl border border-ink/10 p-4">
                  <p className="text-sm text-muted">{item.label}</p>
                  <p className="mt-2 text-2xl font-semibold">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl bg-[#161310] p-6 text-[#f5efe6]">
            <h2 className="text-lg font-semibold">A traiter</h2>
            <div className="mt-4 grid gap-3">
              {alerts.map((alert) => (
                <div key={alert.title} className="rounded-2xl border border-white/10 bg-white/10 p-4">
                  <p className="text-sm font-semibold">{alert.title}</p>
                  <p className="mt-1 text-xs text-white/70">{alert.detail}</p>
                  <span className="mt-3 inline-flex rounded-full bg-white/20 px-2 py-1 text-[10px] uppercase tracking-[0.2em]">
                    {alert.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[2fr,1fr]">
          <div className="rounded-3xl bg-white p-6 shadow-soft">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-lg font-semibold">Validation formateurs</h2>
              <span className="rounded-full bg-[#f0f7ff] px-3 py-1 text-xs font-semibold text-accent2">
                {pendingTrainers.length} en attente
              </span>
            </div>
            <div className="mt-4 grid gap-3">
              {pendingTrainers.length === 0 ? (
                <p className="text-sm text-muted">Aucune validation en attente.</p>
              ) : (
                pendingTrainers.map((trainer) => (
                  <div
                    key={trainer.id}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-ink/10 p-4"
                  >
                    <div>
                      <p className="text-sm font-semibold">{trainer.name}</p>
                      <p className="text-xs text-muted">{trainer.email}</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="rounded-xl border border-ink/15 px-3 py-2 text-xs font-semibold">
                        Refuser
                      </button>
                      <button className="rounded-xl bg-accent px-3 py-2 text-xs font-semibold text-white">
                        Valider
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-soft">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-lg font-semibold">Categories</h2>
              <div className="flex flex-wrap gap-2 text-xs">
                <input
                  className="rounded-xl border border-ink/10 px-3 py-2"
                  placeholder="Rechercher"
                  value={categorySearch}
                  onChange={(event) => setCategorySearch(event.target.value)}
                />
                <select
                  className="rounded-xl border border-ink/10 px-3 py-2"
                  value={categoryActive}
                  onChange={(event) => setCategoryActive(event.target.value)}
                >
                  <option value="">Tous</option>
                  <option value="true">Actives</option>
                  <option value="false">Desactivees</option>
                </select>
              </div>
            </div>
            <div className="mt-4 grid gap-3">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="flex items-center justify-between rounded-2xl border border-ink/10 p-4"
                >
                  <div>
                    <p className="text-sm font-semibold">{category.name}</p>
                    <p className="text-xs text-muted">
                      {category.active ? "Active" : "Desactivee"}
                    </p>
                  </div>
                  <button className="rounded-xl border border-ink/15 px-3 py-2 text-xs font-semibold">
                    Gerer
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-3xl bg-white p-6 shadow-soft">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-semibold">Moderation & signalements</h2>
            <button className="rounded-xl border border-ink/15 px-3 py-2 text-xs font-semibold">
              Filtrer
            </button>
          </div>
          <div className="mt-4 grid gap-3">
            {reports.map((report) => (
              <div
                key={report.id}
                className="grid gap-2 rounded-2xl border border-ink/10 p-4 md:grid-cols-[2fr,1fr,1fr,auto] md:items-center"
              >
                <div>
                  <p className="text-sm font-semibold">{report.title}</p>
                  <p className="text-xs text-muted">{report.course}</p>
                </div>
                <span className="text-xs text-muted">{report.severity}</span>
                <span className="text-xs text-muted">{report.status}</span>
                <button className="rounded-xl bg-accent2 px-3 py-2 text-xs font-semibold text-white">
                  Ouvrir
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[2fr,1fr]">
          <div className="rounded-3xl bg-white p-6 shadow-soft">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-lg font-semibold">Utilisateurs</h2>
              <button className="rounded-xl bg-[#161310] px-3 py-2 text-xs font-semibold text-[#f5efe6]">
                Ajouter un compte
              </button>
            </div>
            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              <input
                className="rounded-xl border border-ink/10 px-3 py-2"
                placeholder="Nom ou email"
                value={userSearch}
                onChange={(event) => {
                  setUserSearch(event.target.value);
                  setUserPage(1);
                }}
              />
              <select
                className="rounded-xl border border-ink/10 px-3 py-2"
                value={userRole}
                onChange={(event) => {
                  setUserRole(event.target.value);
                  setUserPage(1);
                }}
              >
                <option value="">Tous les roles</option>
                <option value="ADMIN">Admin</option>
                <option value="TRAINER">Formateur</option>
                <option value="STUDENT">Apprenant</option>
              </select>
              <select
                className="rounded-xl border border-ink/10 px-3 py-2"
                value={userStatus}
                onChange={(event) => {
                  setUserStatus(event.target.value);
                  setUserPage(1);
                }}
              >
                <option value="">Tous les statuts</option>
                <option value="ACTIVE">Actif</option>
                <option value="PENDING">En attente</option>
                <option value="BLOCKED">Bloque</option>
              </select>
            </div>
            <div className="mt-4 grid gap-3">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="grid gap-2 rounded-2xl border border-ink/10 p-4 md:grid-cols-[2fr,1fr,1fr,auto] md:items-center"
                >
                  <div>
                    <p className="text-sm font-semibold">{user.name}</p>
                    <p className="text-xs text-muted">{user.email}</p>
                  </div>
                  <span className="text-xs text-muted">{user.role}</span>
                  <span className="text-xs text-muted">{user.status}</span>
                  <button className="rounded-xl border border-ink/15 px-3 py-2 text-xs font-semibold">
                    Gerer
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between text-xs text-muted">
              <span>
                Page {usersPayload?.page ?? 1} / {totalPages}
              </span>
              <div className="flex gap-2">
                <button
                  className="rounded-lg border border-ink/15 px-3 py-1"
                  disabled={userPage <= 1}
                  onClick={() => setUserPage((prev) => Math.max(1, prev - 1))}
                >
                  Prec
                </button>
                <button
                  className="rounded-lg border border-ink/15 px-3 py-1"
                  disabled={userPage >= totalPages}
                  onClick={() => setUserPage((prev) => Math.min(totalPages, prev + 1))}
                >
                  Suiv
                </button>
              </div>
            </div>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-soft">
            <h2 className="text-lg font-semibold">Activite recente</h2>
            <div className="mt-4 grid gap-3">
              {activity.map((item) => (
                <div key={item.title} className="rounded-2xl border border-ink/10 p-4">
                  <p className="text-sm font-semibold">{item.title}</p>
                  <p className="text-xs text-muted">{item.detail}</p>
                  <p className="mt-2 text-xs text-muted">{item.time}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl bg-[#f0e7dc] p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-muted">Notifications</p>
              <div className="mt-3 grid gap-2 text-sm">
                {notifications.map((note) => (
                  <div key={note.title} className="rounded-xl bg-white/70 p-3">
                    <p className="text-sm font-semibold">{note.title}</p>
                    <p className="text-xs text-muted">{note.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </DashboardShell>
    </AuthGuard>
  );
}
