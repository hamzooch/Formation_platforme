"use client";

import { AuthGuard } from "../../../components/AuthGuard";
import { DashboardShell } from "../../../components/DashboardShell";

export default function StudentFavoritesPage() {
  return (
    <AuthGuard role="STUDENT">
      <DashboardShell
        title="Favoris"
        subtitle="Retrouvez les formations que vous souhaitez suivre." 
        accent="Apprenant"
        role="STUDENT"
      >
        <section className="rounded-3xl bg-white p-6 shadow-soft">
          <h2 className="text-lg font-semibold">Mes favoris</h2>
          <div className="mt-4 grid gap-3">
            <div className="rounded-2xl border border-ink/10 p-4">
              <p className="text-sm font-semibold">System Design pour SaaS</p>
              <p className="text-xs text-muted">Web Moderne</p>
            </div>
            <div className="rounded-2xl border border-ink/10 p-4">
              <p className="text-sm font-semibold">No-Code Automations</p>
              <p className="text-xs text-muted">Ops</p>
            </div>
          </div>
        </section>
      </DashboardShell>
    </AuthGuard>
  );
}
