"use client";

import { FormEvent, useEffect, useState } from "react";
import { AuthGuard } from "../../../components/AuthGuard";
import { DashboardShell } from "../../../components/DashboardShell";
import { apiGet } from "../../../lib/api";
import { apiBase } from "../../../lib/auth";

type Course = {
  id?: string;
  title: string;
  status: string;
  learners: number;
  completion: string;
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

type TrainerPayload = {
  courses: Course[];
};

export default function TrainerCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [saving, setSaving] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [modules, setModules] = useState<Module[]>([]);
  const [moduleTitle, setModuleTitle] = useState("");
  const [moduleOrder, setModuleOrder] = useState(1);
  const [selectedModuleId, setSelectedModuleId] = useState("");
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonType, setLessonType] = useState<"video" | "document">("video");
  const [lessonOrder, setLessonOrder] = useState(1);
  const [videoUrl, setVideoUrl] = useState("");
  const [docUrl, setDocUrl] = useState("");

  useEffect(() => {
    apiGet<Course[]>("/courses")
      .then((payload) => setCourses(payload))
      .catch(() => setCourses([]));
  }, []);

  useEffect(() => {
    if (!selectedCourseId) {
      setModules([]);
      return;
    }
    apiGet<Module[]>(`/courses/${selectedCourseId}/modules`)
      .then((payload) => setModules(payload))
      .catch(() => setModules([]));
  }, [selectedCourseId]);

  useEffect(() => {
    if (!selectedModuleId) {
      setLessons([]);
      return;
    }
    apiGet<Lesson[]>(`/modules/${selectedModuleId}/lessons`)
      .then((payload) => setLessons(payload))
      .catch(() => setLessons([]));
  }, [selectedModuleId]);

  async function handleCreate(event: FormEvent) {
    event.preventDefault();
    if (!title.trim()) return;
    setSaving(true);
    try {
      await fetch(`${apiBase()}/courses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title.trim(), description: description.trim(), categoryId }),
      });
      const updated = await apiGet<Course[]>("/courses");
      setCourses(updated);
      setTitle("");
      setDescription("");
      setCategoryId("");
    } finally {
      setSaving(false);
    }
  }

  async function handleCreateModule(event: FormEvent) {
    event.preventDefault();
    if (!selectedCourseId || !moduleTitle.trim()) return;
    await fetch(`${apiBase()}/courses/${selectedCourseId}/modules`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: moduleTitle.trim(), order: Number(moduleOrder) }),
    });
    setModuleTitle("");
    const updated = await apiGet<Module[]>(`/courses/${selectedCourseId}/modules`);
    setModules(updated);
  }

  async function handleCreateLesson(event: FormEvent) {
    event.preventDefault();
    if (!selectedModuleId || !lessonTitle.trim()) return;
    await fetch(`${apiBase()}/modules/${selectedModuleId}/lessons`, {
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
    setLessonTitle("");
    setVideoUrl("");
    setDocUrl("");
    const updated = await apiGet<Lesson[]>(`/modules/${selectedModuleId}/lessons`);
    setLessons(updated);
  }

  return (
    <AuthGuard role="TRAINER">
      <DashboardShell
        title="Mes formations"
        subtitle="Gerez vos cours, brouillons et publications."
        accent="Formateur"
        role="TRAINER"
      >
        <section className="rounded-3xl bg-white p-6 shadow-soft">
          <h2 className="text-lg font-semibold">Creer une formation</h2>
          <form onSubmit={handleCreate} className="mt-4 grid gap-3">
            <input
              className="rounded-xl border border-ink/10 px-3 py-2 text-sm"
              placeholder="Titre"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
            <textarea
              className="min-h-[100px] rounded-xl border border-ink/10 px-3 py-2 text-sm"
              placeholder="Description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
            <input
              className="rounded-xl border border-ink/10 px-3 py-2 text-sm"
              placeholder="CategoryId (optionnel)"
              value={categoryId}
              onChange={(event) => setCategoryId(event.target.value)}
            />
            <button
              className="w-fit rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-white"
              disabled={saving}
              type="submit"
            >
              {saving ? "En cours..." : "Publier"}
            </button>
          </form>
        </section>

        <section className="rounded-3xl bg-white p-6 shadow-soft">
          <h2 className="text-lg font-semibold">Modules & lecons</h2>
          <div className="mt-4 grid gap-6 lg:grid-cols-2">
            <div className="grid gap-3">
              <label className="text-xs uppercase tracking-[0.2em] text-muted">Formation</label>
              <select
                className="rounded-xl border border-ink/10 px-3 py-2 text-sm"
                value={selectedCourseId}
                onChange={(event) => {
                  setSelectedCourseId(event.target.value);
                  setSelectedModuleId("");
                }}
              >
                <option value="">Selectionner une formation</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.title}
                  </option>
                ))}
              </select>
              <form onSubmit={handleCreateModule} className="grid gap-2 rounded-2xl border border-ink/10 p-4">
                <p className="text-sm font-semibold">Ajouter un module</p>
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
                  Creer
                </button>
              </form>
              <div className="grid gap-2">
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
            </div>

            <form onSubmit={handleCreateLesson} className="grid gap-3 rounded-2xl border border-ink/10 p-4">
              <p className="text-sm font-semibold">Ajouter une lecon</p>
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
                Creer
              </button>
              {lessons.length > 0 ? (
                <div className="mt-2 grid gap-2">
                  {lessons.map((lesson) => (
                    <div key={lesson.id} className="rounded-xl border border-ink/10 p-3 text-xs">
                      <p className="font-semibold">{lesson.title}</p>
                      <p className="text-muted">{lesson.type}</p>
                    </div>
                  ))}
                </div>
              ) : null}
            </form>
          </div>
        </section>

        <section className="rounded-3xl bg-white p-6 shadow-soft">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-semibold">Catalogue formateur</h2>
            <button className="rounded-xl bg-[#161310] px-3 py-2 text-xs font-semibold text-[#f5efe6]">
              Nouvelle formation
            </button>
          </div>
          <div className="mt-4 grid gap-3">
            {courses.length === 0 ? (
              <p className="text-sm text-muted">Aucune formation disponible.</p>
            ) : (
              courses.map((course) => (
                <div
                  key={course.title}
                  className="grid gap-2 rounded-2xl border border-ink/10 p-4 md:grid-cols-[2fr,1fr,1fr,auto] md:items-center"
                >
                  <div>
                    <p className="text-sm font-semibold">{course.title}</p>
                    <p className="text-xs text-muted">{course.status}</p>
                  </div>
                  <span className="text-xs text-muted">{course.learners} apprenants</span>
                  <span className="text-xs text-muted">{course.completion}</span>
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
