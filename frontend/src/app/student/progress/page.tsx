"use client";

import { useEffect, useState } from "react";
import { AuthGuard } from "../../../components/AuthGuard";
import { DashboardShell } from "../../../components/DashboardShell";
import { apiGet } from "../../../lib/api";

type StudentPayload = {
  enrolled: { title: string; module: string; progress: string }[];
};

export default function StudentProgressPage() {
  const [courses, setCourses] = useState<StudentPayload["enrolled"]>([]);

  useEffect(() => {
    apiGet<StudentPayload>("/dashboard/student")
      .then((payload) => setCourses(payload.enrolled ?? []))
      .catch(() => setCourses([]));
  }, []);

  return (
    <AuthGuard role="STUDENT">
      <DashboardShell
        title="Progression"
        subtitle="Visualisez votre avancement par formation." 
        accent="Apprenant"
        role="STUDENT"
      >
        <section className="rounded-3xl bg-white p-6 shadow-soft">
          <h2 className="text-lg font-semibold">Progression globale</h2>
          <div className="mt-4 grid gap-3">
            {courses.map((course) => (
              <div key={course.title} className="rounded-2xl border border-ink/10 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold">{course.title}</p>
                  <span className="text-xs text-muted">{course.progress}</span>
                </div>
                <p className="mt-1 text-xs text-muted">{course.module}</p>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#efe8de]">
                  <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-accent to-[#f89d5b]" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </DashboardShell>
    </AuthGuard>
  );
}
