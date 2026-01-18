"use client";

import { AuthGuard } from "../../../components/AuthGuard";
import { DashboardShell } from "../../../components/DashboardShell";

export default function TrainerSettingsPage() {
  return (
    <AuthGuard role="TRAINER">
      <DashboardShell
        title="Parametres formateur"
        subtitle="Gerez votre profil, vos paiements et vos preferences." 
        accent="Formateur"
        role="TRAINER"
      >
        <section className="grid gap-6 lg:grid-cols-[2fr,1fr]">
          <div className="rounded-3xl bg-white p-6 shadow-soft">
            <h2 className="text-lg font-semibold">Profil public</h2>
            <div className="mt-4 grid gap-3">
              <div className="rounded-2xl border border-ink/10 p-4">
                <p className="text-sm font-semibold">Bio</p>
                <p className="text-xs text-muted">Mettre a jour la description formateur.</p>
                <button className="mt-3 rounded-xl border border-ink/15 px-3 py-2 text-xs font-semibold">
                  Modifier
                </button>
              </div>
              <div className="rounded-2xl border border-ink/10 p-4">
                <p className="text-sm font-semibold">Liens sociaux</p>
                <p className="text-xs text-muted">Ajouter LinkedIn, portfolio, etc.</p>
                <button className="mt-3 rounded-xl border border-ink/15 px-3 py-2 text-xs font-semibold">
                  Gerer
                </button>
              </div>
            </div>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-soft">
            <h2 className="text-lg font-semibold">Paiements</h2>
            <div className="mt-4 grid gap-3">
              <div className="rounded-2xl border border-ink/10 p-4">
                <p className="text-sm font-semibold">Compte bancaire</p>
                <p className="text-xs text-muted">IBAN non configure.</p>
                <button className="mt-3 rounded-xl border border-ink/15 px-3 py-2 text-xs font-semibold">
                  Ajouter
                </button>
              </div>
              <div className="rounded-2xl border border-ink/10 p-4">
                <p className="text-sm font-semibold">Facturation</p>
                <p className="text-xs text-muted">Exporter les factures mensuelles.</p>
                <button className="mt-3 rounded-xl border border-ink/15 px-3 py-2 text-xs font-semibold">
                  Exporter
                </button>
              </div>
            </div>
          </div>
        </section>
      </DashboardShell>
    </AuthGuard>
  );
}
