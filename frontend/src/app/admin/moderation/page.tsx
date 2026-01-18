"use client";

import { useEffect, useState } from "react";
import { AuthGuard } from "../../../components/AuthGuard";
import { DashboardShell } from "../../../components/DashboardShell";
import { AdminReport, fetchReports } from "../../../lib/admin-api";

export default function AdminModerationPage() {
  const [reports, setReports] = useState<AdminReport[]>([]);

  useEffect(() => {
    fetchReports().then((payload) => setReports(payload.reports)).catch(() => setReports([]));
  }, []);

  return (
    <AuthGuard role="ADMIN">
      <DashboardShell
        title="Moderation"
        subtitle="Suivez les signalements et gardez la qualite des contenus."
        accent="Admin"
        role="ADMIN"
      >
        <section className="rounded-3xl bg-white p-6 shadow-soft">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-semibold">Signalements</h2>
            <div className="flex flex-wrap gap-2 text-xs">
              <button className="rounded-xl border border-ink/15 px-3 py-2">Tous</button>
              <button className="rounded-xl border border-ink/15 px-3 py-2">Nouveau</button>
              <button className="rounded-xl border border-ink/15 px-3 py-2">En attente</button>
              <button className="rounded-xl border border-ink/15 px-3 py-2">Clos</button>
            </div>
          </div>
          <div className="mt-4 grid gap-3">
            {reports.map((report) => (
              <div
                key={report.id}
                className="grid gap-2 rounded-2xl border border-ink/10 p-4 md:grid-cols-[2fr,1fr,1fr,auto] md:items-center"
              >
                <div>
                  <p className="text-sm font-semibold">{report.title}</p>
                  <p className="text-xs text-muted">{report.course}</p>
                </div>
                <span className="text-xs text-muted">{report.severity}</span>
                <span className="text-xs text-muted">{report.status}</span>
                <button className="rounded-xl bg-accent2 px-3 py-2 text-xs font-semibold text-white">
                  Traiter
                </button>
              </div>
            ))}
          </div>
        </section>
      </DashboardShell>
    </AuthGuard>
  );
}
