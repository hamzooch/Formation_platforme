"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { AuthGuard } from "../../../../components/AuthGuard";
import { DashboardShell } from "../../../../components/DashboardShell";
import { apiGet } from "../../../../lib/api";
import { apiBase } from "../../../../lib/auth";

type Course = {
  id: string;
  title: string;
  description: string;
  status: string;
};

type Module = {
  id: string;
  courseId: string;
  title: string;
  order: number;
};

type Lesson = {
  id: string;
  moduleId: string;
  title: string;
  type: "video" | "document";
  order: number;
  videoUrl?: string;
  docUrl?: string;
};

export default function TrainerCourseManagePage() {
  const params = useParams();
  const courseId = params?.id as string;
  const moduleFormRef = useRef<HTMLFormElement | null>(null);
  const [course, setCourse] = useState<Course | null>(null);
  const [modules, setModules] = useState<Module[]>([]);
  const [selectedModuleId, setSelectedModuleId] = useState("");
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [moduleTitle, setModuleTitle] = useState("");
  const [moduleOrder, setModuleOrder] = useState(1);
  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonType, setLessonType] = useState<"video" | "document">("video");
  const [lessonOrder, setLessonOrder] = useState(1);
  const [videoUrl, setVideoUrl] = useState("");
  const [docUrl, setDocUrl] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!courseId) return;
    apiGet<Course>(`/courses/${courseId}`)
      .then((payload) => setCourse(payload))
      .catch(() => setCourse(null));
  }, [courseId]);

  useEffect(() => {
    if (!courseId) return;
    apiGet<Module[]>(`/courses/${courseId}/modules`)
      .then((payload) => setModules(payload))
      .catch(() => setModules([]));
  }, [courseId]);

  useEffect(() => {
    if (!selectedModuleId) {
      setLessons([]);
      return;
    }
    apiGet<Lesson[]>(`/modules/${selectedModuleId}/lessons`)
      .then((payload) => setLessons(payload))
      .catch(() => setLessons([]));
  }, [selectedModuleId]);

  async function handleCreateModule(event: FormEvent) {
    event.preventDefault();
    if (!courseId || !moduleTitle.trim()) return;
    setMessage("");
    const response = await fetch(`${apiBase()}/courses/${courseId}/modules`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: moduleTitle.trim(), order: Number(moduleOrder) }),
    });
    if (response.ok) {
      setModuleTitle("");
      const updated = await apiGet<Module[]>(`/courses/${courseId}/modules`);
      setModules(updated);
      setMessage("Module ajoute.");
    } else {
      setMessage("Erreur lors de la creation du module.");
    }
  }

  async function handleCreateLesson(event: FormEvent) {
    event.preventDefault();
    if (!selectedModuleId || !lessonTitle.trim()) return;
    setMessage("");
    const response = await fetch(`${apiBase()}/modules/${selectedModuleId}/lessons`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: lessonTitle.trim(),
        type: lessonType,
        order: Number(lessonOrder),
        videoUrl: lessonType === "video" ? videoUrl.trim() : undefined,
        docUrl: lessonType === "document" ? docUrl.trim() : undefined,
      }),
    });
    if (response.ok) {
      setLessonTitle("");
      setVideoUrl("");
      setDocUrl("");
      const updated = await apiGet<Lesson[]>(`/modules/${selectedModuleId}/lessons`);
      setLessons(updated);
      setMessage("Lecon ajoutee.");
    } else {
      setMessage("Erreur lors de la creation de la lecon.");
    }
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

  function handleExport() {
    const rows: string[][] = [["Type", "Titre", "Ordre"]];
    modules.forEach((module) => rows.push(["Module", module.title, String(module.order)]));
    lessons.forEach((lesson) => rows.push(["Lecon", lesson.title, String(lesson.order)]));
    downloadCsv(`digitechpro-course-${courseId}.csv`, rows);
  }

  function handlePrimaryAction() {
    moduleFormRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <AuthGuard role="TRAINER">
      <DashboardShell
        title={course?.title ?? "Gerer la formation"}
        subtitle={course?.description ?? "Organisez modules, lecons et medias."}
        accent="Formateur"
        role="TRAINER"
        exportLabel="Exporter"
        primaryLabel="Ajouter module"
        onExport={handleExport}
        onPrimaryAction={handlePrimaryAction}
      >
        <section className="rounded-3xl bg-white p-6 shadow-soft">
          <h2 className="text-lg font-semibold">Modules</h2>
          <form onSubmit={handleCreateModule} className="mt-4 grid gap-3" ref={moduleFormRef}>
            <input
              className="rounded-xl border border-ink/10 px-3 py-2 text-sm"
              placeholder="Titre du module"
              value={moduleTitle}
              onChange={(event) => setModuleTitle(event.target.value)}
            />
            <input
              className="rounded-xl border border-ink/10 px-3 py-2 text-sm"
              type="number"
              min={1}
              value={moduleOrder}
              onChange={(event) => setModuleOrder(Number(event.target.value))}
            />
            <button className="w-fit rounded-xl bg-accent px-3 py-2 text-xs font-semibold text-white">
              Ajouter module
            </button>
          </form>
          <div className="mt-4 grid gap-2">
            {modules.map((module) => (
              <button
                key={module.id}
                className={
                  module.id === selectedModuleId
                    ? "rounded-xl bg-ink px-3 py-2 text-left text-xs font-semibold text-white"
                    : "rounded-xl border border-ink/10 px-3 py-2 text-left text-xs font-semibold"
                }
                onClick={() => setSelectedModuleId(module.id)}
                type="button"
              >
                {module.title}
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-3xl bg-white p-6 shadow-soft">
          <h2 className="text-lg font-semibold">Lecons</h2>
          <form onSubmit={handleCreateLesson} className="mt-4 grid gap-3">
            <select
              className="rounded-xl border border-ink/10 px-3 py-2 text-sm"
              value={selectedModuleId}
              onChange={(event) => setSelectedModuleId(event.target.value)}
            >
              <option value="">Selectionner un module</option>
              {modules.map((module) => (
                <option key={module.id} value={module.id}>
                  {module.title}
                </option>
              ))}
            </select>
            <input
              className="rounded-xl border border-ink/10 px-3 py-2 text-sm"
              placeholder="Titre de la lecon"
              value={lessonTitle}
              onChange={(event) => setLessonTitle(event.target.value)}
            />
            <select
              className="rounded-xl border border-ink/10 px-3 py-2 text-sm"
              value={lessonType}
              onChange={(event) => setLessonType(event.target.value as "video" | "document")}
            >
              <option value="video">Video</option>
              <option value="document">Document</option>
            </select>
            {lessonType === "video" ? (
              <input
                className="rounded-xl border border-ink/10 px-3 py-2 text-sm"
                placeholder="URL video"
                value={videoUrl}
                onChange={(event) => setVideoUrl(event.target.value)}
              />
            ) : (
              <input
                className="rounded-xl border border-ink/10 px-3 py-2 text-sm"
                placeholder="URL document"
                value={docUrl}
                onChange={(event) => setDocUrl(event.target.value)}
              />
            )}
            <input
              className="rounded-xl border border-ink/10 px-3 py-2 text-sm"
              type="number"
              min={1}
              value={lessonOrder}
              onChange={(event) => setLessonOrder(Number(event.target.value))}
            />
            <button className="w-fit rounded-xl bg-accent px-3 py-2 text-xs font-semibold text-white">
              Ajouter lecon
            </button>
          </form>
          {message ? <p className="mt-3 text-sm text-muted">{message}</p> : null}
          <div className="mt-4 grid gap-2">
            {lessons.map((lesson) => (
              <div key={lesson.id} className="rounded-xl border border-ink/10 p-3 text-xs">
                <p className="font-semibold">{lesson.title}</p>
                <p className="text-muted">{lesson.type}</p>
              </div>
            ))}
          </div>
        </section>
      </DashboardShell>
    </AuthGuard>
  );
}
