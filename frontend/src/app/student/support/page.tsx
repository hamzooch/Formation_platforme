"use client";

import { useState } from "react";
import { AuthGuard } from "../../../components/AuthGuard";
import { DashboardShell } from "../../../components/DashboardShell";

export default function StudentSupportPage() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  return (
    <AuthGuard role="STUDENT">
      <DashboardShell
        title="Support"
        subtitle="Besoin d'aide ? Ouvrez un ticket." 
        accent="Apprenant"
        role="STUDENT"
      >
        <section className="rounded-3xl bg-white p-6 shadow-soft">
          <h2 className="text-lg font-semibold">Nouveau ticket</h2>
          <div className="mt-4 grid gap-3">
            <input
              className="rounded-xl border border-ink/10 px-3 py-2 text-sm"
              placeholder="Sujet"
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
            />
            <textarea
              className="min-h-[120px] rounded-xl border border-ink/10 px-3 py-2 text-sm"
              placeholder="Expliquez votre probleme"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            />
            <button className="w-fit rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-white">
              Envoyer
            </button>
          </div>
        </section>
      </DashboardShell>
    </AuthGuard>
  );
}
