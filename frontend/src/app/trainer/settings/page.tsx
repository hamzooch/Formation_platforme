"use client";

import { useState } from "react";
import { AuthGuard } from "../../../components/AuthGuard";
import { DashboardShell } from "../../../components/DashboardShell";

export default function TrainerSettingsPage() {
  const [actionMessage, setActionMessage] = useState("");

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

  function showMessage(text: string) {
    setActionMessage(text);
    setTimeout(() => setActionMessage(""), 2500);
  }

  function handleExportInvoices() {
    const rows: string[][] = [
      ["Mois", "Montant"],
      ["Janvier", "4200 EUR"],
      ["Decembre", "3870 EUR"],
    ];
    downloadCsv("digitechpro-factures.csv", rows);
  }

  return (
    <AuthGuard role="TRAINER">
      <DashboardShell
        title="Parametres formateur"
        subtitle="Gerez votre profil, vos paiements et vos preferences."
        accent="Formateur"
        role="TRAINER"
        exportLabel="Exporter"
        primaryLabel="Sauvegarder"
        onExport={handleExportInvoices}
        onPrimaryAction={() => showMessage("Modifications sauvegardees (mock).")}
      >
        {actionMessage ? (
          <section className="rounded-2xl border border-ink/10 bg-white p-4 text-sm text-muted">
            {actionMessage}
          </section>
        ) : null}
        <section className="grid gap-6 lg:grid-cols-[2fr,1fr]">
          <div className="rounded-3xl bg-white p-6 shadow-soft">
            <h2 className="text-lg font-semibold">Profil public</h2>
            <div className="mt-4 grid gap-3">
              <div className="rounded-2xl border border-ink/10 p-4">
                <p className="text-sm font-semibold">Bio</p>
                <p className="text-xs text-muted">Mettre a jour la description formateur.</p>
                <button
                  className="mt-3 rounded-xl border border-ink/15 px-3 py-2 text-xs font-semibold"
                  onClick={() => showMessage("Edition de la bio lancee (mock).")}
                  type="button"
                >
                  Modifier
                </button>
              </div>
              <div className="rounded-2xl border border-ink/10 p-4">
                <p className="text-sm font-semibold">Liens sociaux</p>
                <p className="text-xs text-muted">Ajouter LinkedIn, portfolio, etc.</p>
                <button
                  className="mt-3 rounded-xl border border-ink/15 px-3 py-2 text-xs font-semibold"
                  onClick={() => showMessage("Gestion des liens sociaux (mock).")}
                  type="button"
                >
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
                <button
                  className="mt-3 rounded-xl border border-ink/15 px-3 py-2 text-xs font-semibold"
                  onClick={() => showMessage("Configuration du compte bancaire (mock).")}
                  type="button"
                >
                  Ajouter
                </button>
              </div>
              <div className="rounded-2xl border border-ink/10 p-4">
                <p className="text-sm font-semibold">Facturation</p>
                <p className="text-xs text-muted">Exporter les factures mensuelles.</p>
                <button
                  className="mt-3 rounded-xl border border-ink/15 px-3 py-2 text-xs font-semibold"
                  onClick={handleExportInvoices}
                  type="button"
                >
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
