"use client";

import { useEffect, useState } from "react";
import { AuthGuard } from "../../../components/AuthGuard";
import { DashboardShell } from "../../../components/DashboardShell";
import { apiGet } from "../../../lib/api";

type StudentPayload = {
  certificates: { title: string; date: string }[];
};

export default function StudentCertificatesPage() {
  const [certificates, setCertificates] = useState<StudentPayload["certificates"]>([]);

  useEffect(() => {
    apiGet<StudentPayload>("/dashboard/student")
      .then((payload) => setCertificates(payload.certificates ?? []))
      .catch(() => setCertificates([]));
  }, []);

  return (
    <AuthGuard role="STUDENT">
      <DashboardShell
        title="Certifications"
        subtitle="Consultez et telechargez vos certificats." 
        accent="Apprenant"
        role="STUDENT"
      >
        <section className="rounded-3xl bg-white p-6 shadow-soft">
          <h2 className="text-lg font-semibold">Certificats obtenus</h2>
          <div className="mt-4 grid gap-3">
            {certificates.length === 0 ? (
              <p className="text-sm text-muted">Aucun certificat pour le moment.</p>
            ) : (
              certificates.map((cert) => (
                <div key={cert.title} className="flex items-center justify-between rounded-2xl border border-ink/10 p-4">
                  <div>
                    <p className="text-sm font-semibold">{cert.title}</p>
                    <p className="text-xs text-muted">{cert.date}</p>
                  </div>
                  <button className="rounded-xl border border-ink/15 px-3 py-2 text-xs font-semibold">
                    Telecharger
                  </button>
                </div>
              ))
            )}
          </div>
        </section>
      </DashboardShell>
    </AuthGuard>
  );
}
