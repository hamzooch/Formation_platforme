"use client";

import { useEffect, useState } from "react";
import { AuthGuard } from "../../../components/AuthGuard";
import { DashboardShell } from "../../../components/DashboardShell";
import { apiGet } from "../../../lib/api";

type Revenue = {
  month: string;
  growth: string;
  pending: string;
};

type TrainerPayload = {
  revenue: Revenue;
};

export default function TrainerRevenuePage() {
  const [revenue, setRevenue] = useState<Revenue | null>(null);

  useEffect(() => {
    apiGet<TrainerPayload>("/dashboard/trainer")
      .then((payload) => setRevenue(payload.revenue))
      .catch(() => setRevenue(null));
  }, []);

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
    const rows: string[][] = [
      ["Periode", "Montant"],
      ["Ce mois", revenue?.month ?? "-"],
      ["Croissance", revenue?.growth ?? "-"],
      ["En attente", revenue?.pending ?? "-"],
    ];
    downloadCsv("digitechpro-trainer-revenue.csv", rows);
  }

  return (
    <AuthGuard role="TRAINER">
      <DashboardShell
        title="Revenus"
        subtitle="Suivez vos gains et les paiements en attente."
        accent="Formateur"
        role="TRAINER"
        exportLabel="Exporter"
        primaryLabel="Exporter rapide"
        onExport={handleExport}
        onPrimaryAction={handleExport}
      >
        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-5 shadow-soft">
            <p className="text-xs uppercase tracking-[0.2em] text-muted">Ce mois</p>
            <p className="mt-3 text-2xl font-semibold">{revenue?.month ?? "-"}</p>
          </div>
          <div className="rounded-2xl bg-white p-5 shadow-soft">
            <p className="text-xs uppercase tracking-[0.2em] text-muted">Croissance</p>
            <p className="mt-3 text-2xl font-semibold">{revenue?.growth ?? "-"}</p>
          </div>
          <div className="rounded-2xl bg-white p-5 shadow-soft">
            <p className="text-xs uppercase tracking-[0.2em] text-muted">En attente</p>
            <p className="mt-3 text-2xl font-semibold">{revenue?.pending ?? "-"}</p>
          </div>
        </section>

        <section className="rounded-3xl bg-white p-6 shadow-soft">
          <h2 className="text-lg font-semibold">Historique recent</h2>
          <div className="mt-4 grid gap-3">
            <div className="flex items-center justify-between rounded-2xl border border-ink/10 p-4">
              <div>
                <p className="text-sm font-semibold">Paiement Janvier</p>
                <p className="text-xs text-muted">Full-Stack TypeScript</p>
              </div>
              <span className="text-xs text-muted">4 200 EUR</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-ink/10 p-4">
              <div>
                <p className="text-sm font-semibold">Paiement Decembre</p>
                <p className="text-xs text-muted">API NestJS avancees</p>
              </div>
              <span className="text-xs text-muted">3 870 EUR</span>
            </div>
          </div>
        </section>
      </DashboardShell>
    </AuthGuard>
  );
}
