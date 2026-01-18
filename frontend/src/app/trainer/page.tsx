"use client";

import { useEffect, useState } from "react";
import { DashboardShell } from "../../components/DashboardShell";
import { AuthGuard } from "../../components/AuthGuard";
import { apiGet } from "../../lib/api";
import { createSocket, NotificationPayload } from "../../lib/realtime";

type TrainerPayload = {
  stats: { label: string; value: string }[];
  courses: { title: string; status: string; learners: number; completion: string }[];
  tasks: string[];
  modules: { course: string; title: string; lessons: number; status: string }[];
  mediaQueue: { name: string; type: string; status: string }[];
  learners: { name: string; course: string; progress: string }[];
  revenue: { month: string; growth: string; pending: string };
  notifications: { title: string; detail: string }[];
};

export default function TrainerDashboard() {
  const [data, setData] = useState<TrainerPayload | null>(null);
  const [liveNotifications, setLiveNotifications] = useState<NotificationPayload[]>([]);

  useEffect(() => {
    apiGet<TrainerPayload>("/dashboard/trainer")
      .then(setData)
      .catch(() => setData(null));
  }, []);

  useEffect(() => {
    if (data?.notifications) {
      setLiveNotifications(data.notifications);
    }
  }, [data]);

  useEffect(() => {
    const socket = createSocket();
    socket.on("notification", (payload: NotificationPayload) => {
      setLiveNotifications((prev) => [payload, ...prev].slice(0, 6));
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  const stats = data?.stats ?? [];
  const courses = data?.courses ?? [];
  const tasks = data?.tasks ?? [];
  const modules = data?.modules ?? [];
  const mediaQueue = data?.mediaQueue ?? [];
  const learners = data?.learners ?? [];
  const revenue = data?.revenue;
  const notifications = liveNotifications;

  return (
    <AuthGuard role="TRAINER">
      <DashboardShell
        title="Dashboard Formateur"
        subtitle="Gerez vos formations et suivez vos apprenants."
        accent="Formateur"
        role="TRAINER"
      >
        <section className="grid gap-4 md:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl bg-white p-5 shadow-soft">
              <p className="text-xs uppercase tracking-[0.2em] text-muted">{stat.label}</p>
              <p className="mt-3 text-2xl font-semibold">{stat.value}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[2fr,1fr]">
          <div className="rounded-3xl bg-white p-6 shadow-soft">
            <h2 className="text-lg font-semibold">Vos formations</h2>
            <div className="mt-4 grid gap-4">
              {courses.map((course) => (
                <div key={course.title} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-ink/10 p-4">
                  <div>
                    <p className="text-sm font-semibold">{course.title}</p>
                    <p className="mt-1 text-xs text-muted">{course.status}</p>
                  </div>
                  <div className="flex gap-6 text-sm text-muted">
                    <span>{course.learners} apprenants</span>
                    <span>{course.completion}</span>
                  </div>
                  <button className="rounded-xl bg-accent2 px-3 py-2 text-xs font-semibold text-white">
                    Ouvrir
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl bg-[#f0e7dc] p-6">
            <h2 className="text-lg font-semibold">A faire</h2>
            <ul className="mt-4 grid gap-3 text-sm text-muted">
              {tasks.map((task) => (
                <li key={task} className="rounded-2xl bg-white/70 p-3">
                  {task}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[2fr,1fr]">
          <div className="rounded-3xl bg-white p-6 shadow-soft">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-lg font-semibold">Modules & lecons</h2>
              <button className="rounded-xl border border-ink/15 px-3 py-2 text-xs font-semibold">
                Ajouter un module
              </button>
            </div>
            <div className="mt-4 grid gap-3">
              {modules.map((module) => (
                <div key={module.title} className="rounded-2xl border border-ink/10 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="text-sm font-semibold">{module.title}</p>
                      <p className="text-xs text-muted">{module.course}</p>
                    </div>
                    <span className="text-xs text-muted">{module.lessons} lecons</span>
                  </div>
                  <p className="mt-2 text-xs text-muted">{module.status}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-soft">
            <h2 className="text-lg font-semibold">Medias</h2>
            <div className="mt-4 grid gap-3">
              {mediaQueue.map((item) => (
                <div key={item.name} className="flex items-center justify-between rounded-2xl border border-ink/10 p-4">
                  <div>
                    <p className="text-sm font-semibold">{item.name}</p>
                    <p className="text-xs text-muted">{item.type}</p>
                  </div>
                  <span className="text-xs text-muted">{item.status}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[2fr,1fr]">
          <div className="rounded-3xl bg-white p-6 shadow-soft">
            <h2 className="text-lg font-semibold">Apprenants</h2>
            <div className="mt-4 grid gap-3">
              {learners.map((learner) => (
                <div key={learner.name} className="grid gap-2 rounded-2xl border border-ink/10 p-4 md:grid-cols-[2fr,1fr,auto] md:items-center">
                  <div>
                    <p className="text-sm font-semibold">{learner.name}</p>
                    <p className="text-xs text-muted">{learner.course}</p>
                  </div>
                  <span className="text-xs text-muted">{learner.progress}</span>
                  <button className="rounded-xl border border-ink/15 px-3 py-2 text-xs font-semibold">
                    Voir
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl bg-[#161310] p-6 text-[#f5efe6]">
            <h2 className="text-lg font-semibold">Revenus</h2>
            <div className="mt-4 grid gap-3 text-sm">
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                <p className="text-xs text-white/70">Ce mois</p>
                <p className="mt-1 text-lg font-semibold">{revenue?.month ?? "-"}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                <p className="text-xs text-white/70">Croissance</p>
                <p className="mt-1 text-lg font-semibold">{revenue?.growth ?? "-"}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                <p className="text-xs text-white/70">En attente</p>
                <p className="mt-1 text-lg font-semibold">{revenue?.pending ?? "-"}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-3xl bg-white p-6 shadow-soft">
          <h2 className="text-lg font-semibold">Notifications</h2>
          <div className="mt-4 grid gap-3">
            {notifications.map((note) => (
              <div key={note.title} className="rounded-2xl border border-ink/10 p-4">
                <p className="text-sm font-semibold">{note.title}</p>
                <p className="text-xs text-muted">{note.detail}</p>
              </div>
            ))}
          </div>
        </section>
      </DashboardShell>
    </AuthGuard>
  );
}
