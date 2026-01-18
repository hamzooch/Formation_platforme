"use client";

import { FormEvent, useEffect, useState } from "react";
import { AuthGuard } from "../../../components/AuthGuard";
import { DashboardShell } from "../../../components/DashboardShell";
import { apiGet } from "../../../lib/api";
import { apiBase } from "../../../lib/auth";

type MediaItem = {
  name: string;
  type: string;
  status: string;
};

type TrainerPayload = {
  mediaQueue: MediaItem[];
  modules: { course: string; title: string; lessons: number; status: string }[];
};

export default function TrainerResourcesPage() {
  const [mediaQueue, setMediaQueue] = useState<MediaItem[]>([]);
  const [modules, setModules] = useState<TrainerPayload["modules"]>([]);
  const [courseId, setCourseId] = useState("");
  const [moduleId, setModuleId] = useState("");
  const [moduleTitle, setModuleTitle] = useState("");
  const [moduleOrder, setModuleOrder] = useState(1);
  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonType, setLessonType] = useState("video");
  const [lessonOrder, setLessonOrder] = useState(1);
  const [fileName, setFileName] = useState("");
  const [contentType, setContentType] = useState("video/mp4");
  const [message, setMessage] = useState("");

  useEffect(() => {
    apiGet<TrainerPayload>("/dashboard/trainer")
      .then((payload) => {
        setMediaQueue(payload.mediaQueue ?? []);
        setModules(payload.modules ?? []);
      })
      .catch(() => {
        setMediaQueue([]);
        setModules([]);
      });
  }, []);

  async function handleModule(event: FormEvent) {
    event.preventDefault();
    setMessage("");
    if (!courseId || !moduleTitle) return;
    const response = await fetch(`${apiBase()}/courses/${courseId}/modules`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: moduleTitle, order: Number(moduleOrder) }),
    });
    if (response.ok) {
      setMessage("Module cree.");
      setModuleTitle("");
    } else {
      setMessage("Erreur creation module.");
    }
  }

  async function handleLesson(event: FormEvent) {
    event.preventDefault();
    setMessage("");
    if (!moduleId || !lessonTitle) return;
    const response = await fetch(`${apiBase()}/modules/${moduleId}/lessons`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: lessonTitle, type: lessonType, order: Number(lessonOrder) }),
    });
    if (response.ok) {
      setMessage("Lecon creee.");
      setLessonTitle("");
    } else {
      setMessage("Erreur creation lecon.");
    }
  }

  async function handleUploadUrl(event: FormEvent) {
    event.preventDefault();
    setMessage("");
    if (!fileName || !contentType) return;
    const response = await fetch(`${apiBase()}/media/upload-url`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filename: fileName, contentType }),
    });
    if (response.ok) {
      setMessage("URL d'upload generee (mock).");
      setFileName("");
    } else {
      setMessage("Erreur media upload.");
    }
  }

  return (
    <AuthGuard role="TRAINER">
      <DashboardShell
        title="Ressources"
        subtitle="Centralisez vos supports et contenus de cours." 
        accent="Formateur"
        role="TRAINER"
      >
        <section className="rounded-3xl bg-white p-6 shadow-soft">
          <h2 className="text-lg font-semibold">Creation rapide</h2>
          <div className="mt-4 grid gap-6 lg:grid-cols-3">
            <form onSubmit={handleModule} className="grid gap-3 rounded-2xl border border-ink/10 p-4">
              <p className="text-sm font-semibold">Nouveau module</p>
              <input
                className="rounded-xl border border-ink/10 px-3 py-2 text-sm"
                placeholder="Course ID"
                value={courseId}
                onChange={(event) => setCourseId(event.target.value)}
              />
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
              <button className="rounded-xl bg-accent px-3 py-2 text-xs font-semibold text-white">
                Creer
              </button>
            </form>

            <form onSubmit={handleLesson} className="grid gap-3 rounded-2xl border border-ink/10 p-4">
              <p className="text-sm font-semibold">Nouvelle lecon</p>
              <input
                className="rounded-xl border border-ink/10 px-3 py-2 text-sm"
                placeholder="Module ID"
                value={moduleId}
                onChange={(event) => setModuleId(event.target.value)}
              />
              <input
                className="rounded-xl border border-ink/10 px-3 py-2 text-sm"
                placeholder="Titre de la lecon"
                value={lessonTitle}
                onChange={(event) => setLessonTitle(event.target.value)}
              />
              <select
                className="rounded-xl border border-ink/10 px-3 py-2 text-sm"
                value={lessonType}
                onChange={(event) => setLessonType(event.target.value)}
              >
                <option value="video">Video</option>
                <option value="document">Document</option>
              </select>
              <input
                className="rounded-xl border border-ink/10 px-3 py-2 text-sm"
                type="number"
                min={1}
                value={lessonOrder}
                onChange={(event) => setLessonOrder(Number(event.target.value))}
              />
              <button className="rounded-xl bg-accent px-3 py-2 text-xs font-semibold text-white">
                Creer
              </button>
            </form>

            <form onSubmit={handleUploadUrl} className="grid gap-3 rounded-2xl border border-ink/10 p-4">
              <p className="text-sm font-semibold">Upload media</p>
              <input
                className="rounded-xl border border-ink/10 px-3 py-2 text-sm"
                placeholder="Nom du fichier"
                value={fileName}
                onChange={(event) => setFileName(event.target.value)}
              />
              <input
                className="rounded-xl border border-ink/10 px-3 py-2 text-sm"
                placeholder="Content-Type"
                value={contentType}
                onChange={(event) => setContentType(event.target.value)}
              />
              <button className="rounded-xl bg-accent px-3 py-2 text-xs font-semibold text-white">
                Generer
              </button>
            </form>
          </div>
          {message ? <p className="mt-4 text-sm text-muted">{message}</p> : null}
        </section>

        <section className="grid gap-6 lg:grid-cols-[2fr,1fr]">
          <div className="rounded-3xl bg-white p-6 shadow-soft">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-lg font-semibold">Medias a traiter</h2>
              <button className="rounded-xl border border-ink/15 px-3 py-2 text-xs font-semibold">
                Ajouter un media
              </button>
            </div>
            <div className="mt-4 grid gap-3">
              {mediaQueue.length === 0 ? (
                <p className="text-sm text-muted">Aucun media en attente.</p>
              ) : (
                mediaQueue.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between rounded-2xl border border-ink/10 p-4"
                  >
                    <div>
                      <p className="text-sm font-semibold">{item.name}</p>
                      <p className="text-xs text-muted">{item.type}</p>
                    </div>
                    <span className="text-xs text-muted">{item.status}</span>
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-soft">
            <h2 className="text-lg font-semibold">Modules en cours</h2>
            <div className="mt-4 grid gap-3">
              {modules.map((module) => (
                <div key={module.title} className="rounded-2xl border border-ink/10 p-4">
                  <p className="text-sm font-semibold">{module.title}</p>
                  <p className="text-xs text-muted">{module.course}</p>
                  <p className="mt-2 text-xs text-muted">{module.lessons} lecons</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </DashboardShell>
    </AuthGuard>
  );
}
