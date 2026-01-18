"use client";

import { useEffect, useState } from "react";
import { DashboardShell } from "../../components/DashboardShell";
import { AuthGuard } from "../../components/AuthGuard";
import { apiGet } from "../../lib/api";

type TrainerPayload = {
  stats: { label: string; value: string }[];
  courses: { title: string; status: string; learners: number; completion: string }[];
  tasks: string[];
};

export default function TrainerDashboard() {
  const [data, setData] = useState<TrainerPayload | null>(null);

  useEffect(() => {
    apiGet<TrainerPayload>("/dashboard/trainer")
      .then(setData)
      .catch(() => setData(null));
  }, []);

  const stats = data?.stats ?? [];
  const courses = data?.courses ?? [];
  const tasks = data?.tasks ?? [];

  return (
    <AuthGuard role="TRAINER">
      <DashboardShell
        title="Dashboard Formateur"
        subtitle="Gerez vos formations et suivez vos apprenants."
        accent="Formateur"
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
      </DashboardShell>
    </AuthGuard>
  );
}
