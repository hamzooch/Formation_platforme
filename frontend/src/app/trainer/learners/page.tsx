"use client";

import { useEffect, useState } from "react";
import { AuthGuard } from "../../../components/AuthGuard";
import { DashboardShell } from "../../../components/DashboardShell";
import { apiGet } from "../../../lib/api";
import { apiBase } from "../../../lib/auth";
import { connectSocket, NotificationPayload } from "../../../lib/realtime";

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
  const [statusFilter, setStatusFilter] = useState<"ALL" | Enrollment["status"]>("ALL");
  const [selectedLearner, setSelectedLearner] = useState<Learner | null>(null);
  const [actionMessage, setActionMessage] = useState("");

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
    loadEnrollments(selectedCourseId);
  }, [selectedCourseId]);

  useEffect(() => {
    const socket = connectSocket();
    const handleNotification = (payload: NotificationPayload) => {
      if (payload.role && payload.role !== "TRAINER") {
        return;
      }
      if (selectedCourseId) {
        loadEnrollments(selectedCourseId);
      }
    };
    socket.on("notification", handleNotification);
    return () => {
      socket.off("notification", handleNotification);
    };
  }, [selectedCourseId]);

  function loadEnrollments(courseId: string) {
    apiGet<{ enrollments: Enrollment[] }>(`/courses/${courseId}/enrollments`)
      .then((payload) => setEnrollments(payload.enrollments))
      .catch(() => setEnrollments([]));
  }

  function downloadCsv(filename: string, rows: string[][]) {
    const content = rows
      .map((row) => row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  }

  function handleExportLearners() {
    const rows: string[][] = [["Nom", "Formation", "Progression"]];
    learners.forEach((learner) => rows.push([learner.name, learner.course, learner.progress]));
    downloadCsv("digitechpro-trainer-learners.csv", rows);
  }

  function handlePrimaryAction() {
    setActionMessage("Action rapide envoyee (mock).");
    setTimeout(() => setActionMessage(""), 2500);
  }

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

  const filteredEnrollments =
    statusFilter === "ALL"
      ? enrollments
      : enrollments.filter((item) => item.status === statusFilter);
  const pendingCount = enrollments.filter((item) => item.status === "PENDING").length;

  return (
    <AuthGuard role="TRAINER">
      <DashboardShell
        title="Apprenants"
        subtitle="Suivez les participants et validez les inscriptions."
        accent="Formateur"
        role="TRAINER"
        exportLabel="Exporter"
        primaryLabel="Nouvelle action"
        onExport={handleExportLearners}
        onPrimaryAction={handlePrimaryAction}
      >
        {actionMessage ? (
          <section className="rounded-2xl border border-ink/10 bg-white p-4 text-sm text-muted">
            {actionMessage}
          </section>
        ) : null}
        <section className="rounded-3xl bg-white p-6 shadow-soft">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-semibold">Demandes d'inscription</h2>
            <div className="flex flex-wrap items-center gap-2">
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
              <button
                className="rounded-xl border border-ink/15 px-3 py-2 text-xs font-semibold"
                disabled={!selectedCourseId}
                onClick={() => selectedCourseId && loadEnrollments(selectedCourseId)}
              >
                Rafraichir
              </button>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted">
            <span className="rounded-full border border-ink/10 px-2 py-1">
              {pendingCount} en attente
            </span>
            <button
              className={`rounded-full px-3 py-1 ${
                statusFilter === "ALL" ? "bg-ink text-white" : "border border-ink/10"
              }`}
              onClick={() => setStatusFilter("ALL")}
            >
              Tous
            </button>
            <button
              className={`rounded-full px-3 py-1 ${
                statusFilter === "PENDING" ? "bg-ink text-white" : "border border-ink/10"
              }`}
              onClick={() => setStatusFilter("PENDING")}
            >
              En attente
            </button>
            <button
              className={`rounded-full px-3 py-1 ${
                statusFilter === "APPROVED" ? "bg-ink text-white" : "border border-ink/10"
              }`}
              onClick={() => setStatusFilter("APPROVED")}
            >
              Approuve
            </button>
            <button
              className={`rounded-full px-3 py-1 ${
                statusFilter === "REJECTED" ? "bg-ink text-white" : "border border-ink/10"
              }`}
              onClick={() => setStatusFilter("REJECTED")}
            >
              Refuse
            </button>
          </div>
          <div className="mt-4 grid gap-3">
            {filteredEnrollments.length === 0 ? (
              <p className="text-sm text-muted">Aucune demande pour ce cours.</p>
            ) : (
              filteredEnrollments.map((enroll) => (
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
                      disabled={busyId === enroll.id || enroll.status !== "PENDING"}
                      onClick={() => updateStatus(enroll.id, "REJECTED")}
                    >
                      Refuser
                    </button>
                    <button
                      className="rounded-xl bg-accent px-3 py-2 text-xs font-semibold text-white"
                      disabled={busyId === enroll.id || enroll.status !== "PENDING"}
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
            <button
              className="rounded-xl border border-ink/15 px-3 py-2 text-xs font-semibold"
              onClick={handleExportLearners}
              type="button"
            >
              Exporter CSV
            </button>
          </div>
          {selectedLearner ? (
            <div className="mt-4 rounded-2xl border border-ink/10 bg-[#f8f3ec] p-4 text-sm">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-semibold">{selectedLearner.name}</p>
                  <p className="text-xs text-muted">{selectedLearner.course}</p>
                </div>
                <span className="text-xs text-muted">{selectedLearner.progress}</span>
                <button
                  className="rounded-xl border border-ink/15 px-3 py-2 text-xs font-semibold"
                  onClick={() => setSelectedLearner(null)}
                  type="button"
                >
                  Fermer
                </button>
              </div>
            </div>
          ) : null}
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
                  <button
                    className="rounded-xl border border-ink/15 px-3 py-2 text-xs font-semibold"
                    onClick={() => setSelectedLearner(learner)}
                    type="button"
                  >
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
