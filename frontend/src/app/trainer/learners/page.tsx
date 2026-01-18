"use client";

import { useEffect, useState } from "react";
import { AuthGuard } from "../../../components/AuthGuard";
import { DashboardShell } from "../../../components/DashboardShell";
import { apiGet } from "../../../lib/api";
import { apiBase } from "../../../lib/auth";

type Learner = {
  name: string;
  course: string;
  progress: string;
};

type TrainerPayload = {
  learners: Learner[];
};

type Course = {
  id: string;
  title: string;
};

type Enrollment = {
  id: string;
  courseId: string;
  userId: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
};

export default function TrainerLearnersPage() {
  const [learners, setLearners] = useState<Learner[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [busyId, setBusyId] = useState<string | null>(null);

  useEffect(() => {
    apiGet<TrainerPayload>("/dashboard/trainer")
      .then((payload) => setLearners(payload.learners ?? []))
      .catch(() => setLearners([]));
  }, []);

  useEffect(() => {
    apiGet<Course[]>("/courses")
      .then((payload) => setCourses(payload))
      .catch(() => setCourses([]));
  }, []);

  useEffect(() => {
    if (!selectedCourseId) {
      setEnrollments([]);
      return;
    }
    apiGet<{ enrollments: Enrollment[] }>(`/courses/${selectedCourseId}/enrollments`)
      .then((payload) => setEnrollments(payload.enrollments))
      .catch(() => setEnrollments([]));
  }, [selectedCourseId]);

  async function updateStatus(id: string, status: "APPROVED" | "REJECTED") {
    setBusyId(id);
    try {
      await fetch(`${apiBase()}/enrollments/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      setEnrollments((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status } : item)),
      );
    } finally {
      setBusyId(null);
    }
  }

  return (
    <AuthGuard role="TRAINER">
      <DashboardShell
        title="Apprenants"
        subtitle="Suivez les participants et validez les inscriptions." 
        accent="Formateur"
        role="TRAINER"
      >
        <section className="rounded-3xl bg-white p-6 shadow-soft">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-semibold">Demandes d'inscription</h2>
            <select
              className="rounded-xl border border-ink/10 px-3 py-2 text-xs"
              value={selectedCourseId}
              onChange={(event) => setSelectedCourseId(event.target.value)}
            >
              <option value="">Selectionner une formation</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.title}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-4 grid gap-3">
            {enrollments.length === 0 ? (
              <p className="text-sm text-muted">Aucune demande pour ce cours.</p>
            ) : (
              enrollments.map((enroll) => (
                <div
                  key={enroll.id}
                  className="grid gap-2 rounded-2xl border border-ink/10 p-4 md:grid-cols-[2fr,1fr,auto] md:items-center"
                >
                  <div>
                    <p className="text-sm font-semibold">Utilisateur {enroll.userId}</p>
                    <p className="text-xs text-muted">{enroll.status}</p>
                  </div>
                  <span className="text-xs text-muted">{enroll.createdAt.slice(0, 10)}</span>
                  <div className="flex gap-2">
                    <button
                      className="rounded-xl border border-ink/15 px-3 py-2 text-xs font-semibold"
                      disabled={busyId === enroll.id}
                      onClick={() => updateStatus(enroll.id, "REJECTED")}
                    >
                      Refuser
                    </button>
                    <button
                      className="rounded-xl bg-accent px-3 py-2 text-xs font-semibold text-white"
                      disabled={busyId === enroll.id}
                      onClick={() => updateStatus(enroll.id, "APPROVED")}
                    >
                      Accepter
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        <section className="rounded-3xl bg-white p-6 shadow-soft">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-semibold">Participants actifs</h2>
            <button className="rounded-xl border border-ink/15 px-3 py-2 text-xs font-semibold">
              Exporter CSV
            </button>
          </div>
          <div className="mt-4 grid gap-3">
            {learners.length === 0 ? (
              <p className="text-sm text-muted">Aucun apprenant pour le moment.</p>
            ) : (
              learners.map((learner) => (
                <div
                  key={`${learner.name}-${learner.course}`}
                  className="grid gap-2 rounded-2xl border border-ink/10 p-4 md:grid-cols-[2fr,1fr,auto] md:items-center"
                >
                  <div>
                    <p className="text-sm font-semibold">{learner.name}</p>
                    <p className="text-xs text-muted">{learner.course}</p>
                  </div>
                  <span className="text-xs text-muted">{learner.progress}</span>
                  <button className="rounded-xl border border-ink/15 px-3 py-2 text-xs font-semibold">
                    Profil
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
