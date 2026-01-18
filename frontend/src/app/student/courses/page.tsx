"use client";

import { useEffect, useState } from "react";
import { AuthGuard } from "../../../components/AuthGuard";
import { DashboardShell } from "../../../components/DashboardShell";
import { apiGet } from "../../../lib/api";
import { apiBase, getSession } from "../../../lib/auth";

type Course = {
  id: string;
  title: string;
  description: string;
  status: string;
};

export default function StudentCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [enrollments, setEnrollments] = useState<Record<string, string>>({});

  useEffect(() => {
    apiGet<Course[]>("/courses")
      .then((payload) => setCourses(payload))
      .catch(() => setCourses([]));
  }, []);

  async function handleEnroll(courseId: string) {
    const session = getSession();
    if (!session) {
      return;
    }
    setBusyId(courseId);
    try {
      const response = await fetch(`${apiBase()}/courses/${courseId}/enroll`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: session.user.id }),
      });
      const payload = await response.json();
      if (payload?.enrollment?.status) {
        setEnrollments((prev) => ({
          ...prev,
          [courseId]: payload.enrollment.status,
        }));
      }
    } finally {
      setBusyId(null);
    }
  }

  return (
    <AuthGuard role="STUDENT">
      <DashboardShell
        title="Mes formations"
        subtitle="Reprenez vos cours et suivez vos modules." 
        accent="Apprenant"
        role="STUDENT"
      >
        <section className="rounded-3xl bg-white p-6 shadow-soft">
          <h2 className="text-lg font-semibold">Catalogue disponible</h2>
          <div className="mt-4 grid gap-3">
            {courses.length === 0 ? (
              <p className="text-sm text-muted">Aucune formation disponible.</p>
            ) : (
              courses.map((course) => (
                <div key={course.id} className="rounded-2xl border border-ink/10 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold">{course.title}</p>
                      <p className="text-xs text-muted">{course.description}</p>
                    </div>
                    <span className="text-xs text-muted">{course.status}</span>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs text-muted">
                      {enrollments[course.id] === "PENDING"
                        ? "En attente"
                        : enrollments[course.id] === "APPROVED"
                          ? "Inscrit"
                          : enrollments[course.id] === "REJECTED"
                            ? "Refuse"
                            : ""}
                    </span>
                    <button
                      className="rounded-xl bg-accent px-3 py-2 text-xs font-semibold text-white"
                      disabled={busyId === course.id || enrollments[course.id] === "PENDING"}
                      onClick={() => handleEnroll(course.id)}
                    >
                      {busyId === course.id
                        ? "..."
                        : enrollments[course.id] === "PENDING"
                          ? "Demande envoyee"
                          : "S'inscrire"}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </DashboardShell>
    </AuthGuard>
  );
}
