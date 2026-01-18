"use client";

import { AuthGuard } from "../../../components/AuthGuard";
import { DashboardShell } from "../../../components/DashboardShell";

export default function AdminSettingsPage() {
  return (
    <AuthGuard role="ADMIN">
      <DashboardShell
        title="Parametres"
        subtitle="Configurez les options globales de DigitechPro."
        accent="Admin"
        role="ADMIN"
      >
        <section className="grid gap-6 lg:grid-cols-[2fr,1fr]">
          <div className="rounded-3xl bg-white p-6 shadow-soft">
            <h2 className="text-lg font-semibold">Regles de la plateforme</h2>
            <div className="mt-4 grid gap-3">
              <div className="rounded-2xl border border-ink/10 p-4">
                <p className="text-sm font-semibold">Validation formateurs</p>
                <p className="text-xs text-muted">Activation manuelle requise.</p>
                <button className="mt-3 rounded-xl border border-ink/15 px-3 py-2 text-xs font-semibold">
                  Modifier
                </button>
              </div>
              <div className="rounded-2xl border border-ink/10 p-4">
                <p className="text-sm font-semibold">Politique de contenu</p>
                <p className="text-xs text-muted">Moderation appliquee aux signalements.</p>
                <button className="mt-3 rounded-xl border border-ink/15 px-3 py-2 text-xs font-semibold">
                  Configurer
                </button>
              </div>
              <div className="rounded-2xl border border-ink/10 p-4">
                <p className="text-sm font-semibold">Acces API</p>
                <p className="text-xs text-muted">Cle API et permissions.</p>
                <button className="mt-3 rounded-xl border border-ink/15 px-3 py-2 text-xs font-semibold">
                  Gerer
                </button>
              </div>
            </div>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-soft">
            <h2 className="text-lg font-semibold">Support & maintenance</h2>
            <div className="mt-4 grid gap-3">
              <div className="rounded-2xl border border-ink/10 p-4">
                <p className="text-sm font-semibold">Etat systeme</p>
                <p className="text-xs text-muted">Tous les services sont operationnels.</p>
              </div>
              <div className="rounded-2xl border border-ink/10 p-4">
                <p className="text-sm font-semibold">Planifier maintenance</p>
                <p className="text-xs text-muted">Dim 02:00 - 03:00</p>
                <button className="mt-3 rounded-xl border border-ink/15 px-3 py-2 text-xs font-semibold">
                  Planifier
                </button>
              </div>
              <div className="rounded-2xl border border-ink/10 p-4">
                <p className="text-sm font-semibold">Support</p>
                <p className="text-xs text-muted">6 tickets ouverts.</p>
                <button className="mt-3 rounded-xl border border-ink/15 px-3 py-2 text-xs font-semibold">
                  Ouvrir
                </button>
              </div>
            </div>
          </div>
        </section>
      </DashboardShell>
    </AuthGuard>
  );
}
