"use client";

import { useEffect, useState } from "react";
import { AuthGuard } from "../../../components/AuthGuard";
import { DashboardShell } from "../../../components/DashboardShell";
import { apiGet } from "../../../lib/api";

type Course = {
  id: string;
  title: string;
  description: string;
  status: string;
};

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    apiGet<{ message?: string } | Course[]>("/courses")
      .then((payload) => {
        if (Array.isArray(payload)) {
          setCourses(payload);
        } else {
          setCourses([]);
        }
      })
      .catch(() => setCourses([]));
  }, []);

  return (
    <AuthGuard role="ADMIN">
      <DashboardShell
        title="Formations"
        subtitle="Supervisez les formations publiees et en brouillon."
        accent="Admin"
        role="ADMIN"
      >
        <section className="rounded-3xl bg-white p-6 shadow-soft">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-semibold">Catalogue</h2>
            <button className="rounded-xl bg-[#161310] px-3 py-2 text-xs font-semibold text-[#f5efe6]">
              Ajouter une formation
            </button>
          </div>
          <div className="mt-4 grid gap-3">
            {courses.length === 0 ? (
              <p className="text-sm text-muted">Aucune formation disponible.</p>
            ) : (
              courses.map((course) => (
                <div
                  key={course.id}
                  className="grid gap-2 rounded-2xl border border-ink/10 p-4 md:grid-cols-[2fr,1fr,auto] md:items-center"
                >
                  <div>
                    <p className="text-sm font-semibold">{course.title}</p>
                    <p className="text-xs text-muted">{course.description}</p>
                  </div>
                  <span className="text-xs text-muted">{course.status}</span>
                  <button className="rounded-xl border border-ink/15 px-3 py-2 text-xs font-semibold">
                    Gerer
                  </button>
                </div>
              ))
            )}
          </div>
        </section>
      </DashboardShell>
    </AuthGuard>
  );
}
