"use client";

import { useEffect, useState } from "react";
import { DashboardShell } from "../../components/DashboardShell";
import { AuthGuard } from "../../components/AuthGuard";
import { apiGet } from "../../lib/api";

type AdminPayload = {
  stats: { label: string; value: string }[];
  alerts: { title: string; detail: string; tag: string }[];
  overview: { label: string; value: string }[];
};

export default function AdminDashboard() {
  const [data, setData] = useState<AdminPayload | null>(null);

  useEffect(() => {
    apiGet<AdminPayload>("/dashboard/admin")
      .then(setData)
      .catch(() => setData(null));
  }, []);

  const stats = data?.stats ?? [];
  const alerts = data?.alerts ?? [];
  const overview = data?.overview ?? [];

  return (
    <AuthGuard role="ADMIN">
      <DashboardShell
        title="Dashboard Administrateur"
        subtitle="Pilotez la plateforme DigitechPro en temps reel."
        accent="Admin"
      >
        <section className="grid gap-4 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl bg-white p-5 shadow-soft">
              <p className="text-xs uppercase tracking-[0.2em] text-muted">{stat.label}</p>
              <p className="mt-3 text-2xl font-semibold">{stat.value}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[2fr,1fr]">
          <div className="rounded-3xl bg-white p-6 shadow-soft">
            <h2 className="text-lg font-semibold">Vue globale</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {overview.map((item) => (
                <div key={item.label} className="rounded-2xl border border-ink/10 p-4">
                  <p className="text-sm text-muted">{item.label}</p>
                  <p className="mt-2 text-2xl font-semibold">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl bg-[#161310] p-6 text-[#f5efe6]">
            <h2 className="text-lg font-semibold">A traiter</h2>
            <div className="mt-4 grid gap-3">
              {alerts.map((alert) => (
                <div key={alert.title} className="rounded-2xl border border-white/10 bg-white/10 p-4">
                  <p className="text-sm font-semibold">{alert.title}</p>
                  <p className="mt-1 text-xs text-white/70">{alert.detail}</p>
                  <span className="mt-3 inline-flex rounded-full bg-white/20 px-2 py-1 text-[10px] uppercase tracking-[0.2em]">
                    {alert.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </DashboardShell>
    </AuthGuard>
  );
}
