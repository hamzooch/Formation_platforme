"use client";

import { AuthGuard } from "../../../components/AuthGuard";
import { DashboardShell } from "../../../components/DashboardShell";

export default function StudentSettingsPage() {
  return (
    <AuthGuard role="STUDENT">
      <DashboardShell
        title="Parametres"
        subtitle="Mettez a jour votre profil et vos preferences." 
        accent="Apprenant"
        role="STUDENT"
      >
        <section className="grid gap-6 lg:grid-cols-[2fr,1fr]">
          <div className="rounded-3xl bg-white p-6 shadow-soft">
            <h2 className="text-lg font-semibold">Profil</h2>
            <div className="mt-4 grid gap-3">
              <div className="rounded-2xl border border-ink/10 p-4">
                <p className="text-sm font-semibold">Informations personnelles</p>
                <p className="text-xs text-muted">Nom, email, photo.</p>
                <button className="mt-3 rounded-xl border border-ink/15 px-3 py-2 text-xs font-semibold">
                  Modifier
                </button>
              </div>
              <div className="rounded-2xl border border-ink/10 p-4">
                <p className="text-sm font-semibold">Mot de passe</p>
                <p className="text-xs text-muted">Changer votre mot de passe.</p>
                <button className="mt-3 rounded-xl border border-ink/15 px-3 py-2 text-xs font-semibold">
                  Modifier
                </button>
              </div>
            </div>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-soft">
            <h2 className="text-lg font-semibold">Preferences</h2>
            <div className="mt-4 grid gap-3">
              <div className="rounded-2xl border border-ink/10 p-4">
                <p className="text-sm font-semibold">Notifications</p>
                <p className="text-xs text-muted">Email et push.</p>
                <button className="mt-3 rounded-xl border border-ink/15 px-3 py-2 text-xs font-semibold">
                  Configurer
                </button>
              </div>
              <div className="rounded-2xl border border-ink/10 p-4">
                <p className="text-sm font-semibold">Langue</p>
                <p className="text-xs text-muted">Francais.</p>
                <button className="mt-3 rounded-xl border border-ink/15 px-3 py-2 text-xs font-semibold">
                  Changer
                </button>
              </div>
            </div>
          </div>
        </section>
      </DashboardShell>
    </AuthGuard>
  );
}
