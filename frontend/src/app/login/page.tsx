"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { apiBase, setSession, UserRole } from "../../lib/auth";

const roleLabels: Record<UserRole, string> = {
  ADMIN: "Administrateur",
  TRAINER: "Formateur",
  STUDENT: "Apprenant",
};

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const presetRole = searchParams.get("role") as UserRole | null;
  const [role, setRole] = useState<UserRole>(presetRole ?? "ADMIN");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const roleHint = useMemo(() => {
    return role === "ADMIN"
      ? "admin@digitechpro.test"
      : role === "TRAINER"
        ? "trainer@digitechpro.test"
        : "student@digitechpro.test";
  }, [role]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(`${apiBase()}/auth/mock-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, role }),
      });

      const payload = await response.json();
      if (!response.ok || payload.error) {
        throw new Error(payload.error || "Login failed");
      }

      setSession(payload);
      router.replace(role === "ADMIN" ? "/admin" : role === "TRAINER" ? "/trainer" : "/student");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-cream text-ink">
      <div className="mx-auto flex min-h-screen max-w-4xl items-center px-6">
        <div className="w-full rounded-3xl bg-white p-10 shadow-soft">
          <h1 className="text-3xl font-semibold">Connexion mock</h1>
          <p className="mt-2 text-sm text-muted">
            Choisissez un role et utilisez un email de test pour acceder aux dashboards.
          </p>

          <form onSubmit={onSubmit} className="mt-6 grid gap-4">
            <div className="grid gap-2">
              <label className="text-xs uppercase tracking-[0.2em] text-muted">Role</label>
              <select
                className="rounded-xl border border-ink/15 px-4 py-2"
                value={role}
                onChange={(event) => setRole(event.target.value as UserRole)}
              >
                {Object.entries(roleLabels).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid gap-2">
              <label className="text-xs uppercase tracking-[0.2em] text-muted">Email</label>
              <input
                className="rounded-xl border border-ink/15 px-4 py-2"
                placeholder={roleHint}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <p className="text-xs text-muted">Exemple: {roleHint}</p>
            </div>
            {error ? <p className="text-sm text-red-600">{error}</p> : null}
            <button
              type="submit"
              className="rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-white"
              disabled={loading}
            >
              {loading ? "Connexion..." : `Entrer en tant que ${roleLabels[role]}`}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
