"use client";

import { useEffect, useState } from "react";
import { AuthGuard } from "../../../components/AuthGuard";
import { DashboardShell } from "../../../components/DashboardShell";
import { apiGet } from "../../../lib/api";

type Course = {
  title: string;
  status: string;
  learners: number;
  completion: string;
};

type TrainerPayload = {
  courses: Course[];
};

export default function TrainerProgressPage() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    apiGet<TrainerPayload>("/dashboard/trainer")
      .then((payload) => setCourses(payload.courses ?? []))
      .catch(() => setCourses([]));
  }, []);

  return (
    <AuthGuard role="TRAINER">
      <DashboardShell
        title="Progression"
        subtitle="Analysez l'avancement des formations par groupe." 
        accent="Formateur"
        role="TRAINER"
      >
        <section className="rounded-3xl bg-white p-6 shadow-soft">
          <h2 className="text-lg font-semibold">Progression par cours</h2>
          <div className="mt-4 grid gap-3">
            {courses.length === 0 ? (
              <p className="text-sm text-muted">Aucune donnee disponible.</p>
            ) : (
              courses.map((course) => (
                <div key={course.title} className="rounded-2xl border border-ink/10 p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold">{course.title}</p>
                    <span className="text-xs text-muted">{course.completion}</span>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#efe8de]">
                    <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-accent to-[#f89d5b]" />
                  </div>
                  <p className="mt-2 text-xs text-muted">
                    {course.learners} apprenants actifs
                  </p>
                </div>
              ))
            )}
          </div>
        </section>
      </DashboardShell>
    </AuthGuard>
  );
}
