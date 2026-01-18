"use client";

import { useEffect, useState } from "react";
import { DashboardShell } from "../../components/DashboardShell";
import { AuthGuard } from "../../components/AuthGuard";
import { apiGet } from "../../lib/api";

type StudentPayload = {
  stats: { label: string; value: string }[];
  enrolled: { title: string; module: string; progress: string }[];
  nextLessons: { title: string; course: string; duration: string }[];
};

export default function StudentDashboard() {
  const [data, setData] = useState<StudentPayload | null>(null);

  useEffect(() => {
    apiGet<StudentPayload>("/dashboard/student")
      .then(setData)
      .catch(() => setData(null));
  }, []);

  const stats = data?.stats ?? [];
  const enrolled = data?.enrolled ?? [];
  const nextLessons = data?.nextLessons ?? [];

  return (
    <AuthGuard role="STUDENT">
      <DashboardShell
        title="Dashboard Apprenant"
        subtitle="Continuez vos parcours, suivez vos progres et vos objectifs."
        accent="Apprenant"
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
            <h2 className="text-lg font-semibold">Mes formations</h2>
            <div className="mt-4 grid gap-4">
              {enrolled.map((course) => (
                <div key={course.title} className="rounded-2xl border border-ink/10 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="text-sm font-semibold">{course.title}</p>
                      <p className="mt-1 text-xs text-muted">{course.module}</p>
                    </div>
                    <span className="rounded-full bg-[#f0f7ff] px-3 py-1 text-xs font-semibold text-accent2">
                      {course.progress}
                    </span>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#efe8de]">
                    <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-accent to-[#f89d5b]" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl bg-[#161310] p-6 text-[#f5efe6]">
            <h2 className="text-lg font-semibold">A suivre ensuite</h2>
            <div className="mt-4 grid gap-3">
              {nextLessons.map((lesson) => (
                <div key={lesson.title} className="rounded-2xl border border-white/10 bg-white/10 p-4">
                  <p className="text-sm font-semibold">{lesson.title}</p>
                  <p className="mt-1 text-xs text-white/70">{lesson.course}</p>
                  <p className="mt-2 text-xs text-white/60">{lesson.duration}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </DashboardShell>
    </AuthGuard>
  );
}
