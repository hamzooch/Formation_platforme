"use client";

import { useEffect, useMemo, useState } from "react";
import { AuthGuard } from "../../../components/AuthGuard";
import { DashboardShell } from "../../../components/DashboardShell";
import {
  AdminUser,
  UsersResponse,
  fetchUsers,
  updateUserStatus,
} from "../../../lib/admin-api";

type StatusValue = "ACTIVE" | "PENDING" | "BLOCKED";

type StatusAction = "active" | "pending" | "blocked";

function nextStatus(user: AdminUser): StatusAction {
  if (user.status === "ACTIVE") {
    return "blocked";
  }
  return "active";
}

function statusLabel(status: StatusValue) {
  if (status === "ACTIVE") return "Actif";
  if (status === "PENDING") return "En attente";
  return "Bloque";
}

export default function AdminUsersPage() {
  const [payload, setPayload] = useState<UsersResponse | null>(null);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [busyId, setBusyId] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers({
      search: search || undefined,
      role: role || undefined,
      status: status || undefined,
      page,
      pageSize: 10,
    })
      .then(setPayload)
      .catch(() => setPayload(null));
  }, [search, role, status, page]);

  const users = payload?.users ?? [];
  const totalPages = payload ? Math.ceil(payload.total / payload.pageSize) : 1;

  const summary = useMemo(() => {
    return {
      total: payload?.total ?? 0,
      pending: users.filter((user) => user.status === "PENDING").length,
      blocked: users.filter((user) => user.status === "BLOCKED").length,
    };
  }, [payload, users]);

  async function handleStatus(user: AdminUser) {
    const action = nextStatus(user);
    setBusyId(user.id);
    try {
      await updateUserStatus(user.id, action);
      setPayload((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          users: prev.users.map((item) =>
            item.id === user.id
              ? { ...item, status: action.toUpperCase() as StatusValue }
              : item,
          ),
        };
      });
    } finally {
      setBusyId(null);
    }
  }

  return (
    <AuthGuard role="ADMIN">
      <DashboardShell
        title="Utilisateurs"
        subtitle="Gerez les comptes, roles et statuts de la plateforme."
        accent="Admin"
        role="ADMIN"
      >
        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-5 shadow-soft">
            <p className="text-xs uppercase tracking-[0.2em] text-muted">Total comptes</p>
            <p className="mt-3 text-2xl font-semibold">{summary.total}</p>
          </div>
          <div className="rounded-2xl bg-white p-5 shadow-soft">
            <p className="text-xs uppercase tracking-[0.2em] text-muted">En attente</p>
            <p className="mt-3 text-2xl font-semibold">{summary.pending}</p>
          </div>
          <div className="rounded-2xl bg-white p-5 shadow-soft">
            <p className="text-xs uppercase tracking-[0.2em] text-muted">Bloques</p>
            <p className="mt-3 text-2xl font-semibold">{summary.blocked}</p>
          </div>
        </section>

        <section className="rounded-3xl bg-white p-6 shadow-soft">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-semibold">Liste des utilisateurs</h2>
            <button className="rounded-xl bg-[#161310] px-3 py-2 text-xs font-semibold text-[#f5efe6]">
              Ajouter un compte
            </button>
          </div>
          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            <input
              className="rounded-xl border border-ink/10 px-3 py-2"
              placeholder="Nom ou email"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
            />
            <select
              className="rounded-xl border border-ink/10 px-3 py-2"
              value={role}
              onChange={(event) => {
                setRole(event.target.value);
                setPage(1);
              }}
            >
              <option value="">Tous les roles</option>
              <option value="ADMIN">Admin</option>
              <option value="TRAINER">Formateur</option>
              <option value="STUDENT">Apprenant</option>
            </select>
            <select
              className="rounded-xl border border-ink/10 px-3 py-2"
              value={status}
              onChange={(event) => {
                setStatus(event.target.value);
                setPage(1);
              }}
            >
              <option value="">Tous les statuts</option>
              <option value="ACTIVE">Actif</option>
              <option value="PENDING">En attente</option>
              <option value="BLOCKED">Bloque</option>
            </select>
          </div>
          <div className="mt-4 grid gap-3">
            {users.map((user) => (
              <div
                key={user.id}
                className="grid gap-2 rounded-2xl border border-ink/10 p-4 md:grid-cols-[2fr,1fr,1fr,auto] md:items-center"
              >
                <div>
                  <p className="text-sm font-semibold">{user.name}</p>
                  <p className="text-xs text-muted">{user.email}</p>
                </div>
                <span className="text-xs text-muted">{user.role}</span>
                <span className="text-xs text-muted">{statusLabel(user.status)}</span>
                <button
                  className="rounded-xl border border-ink/15 px-3 py-2 text-xs font-semibold"
                  disabled={busyId === user.id}
                  onClick={() => handleStatus(user)}
                >
                  {busyId === user.id
                    ? "..."
                    : user.status === "ACTIVE"
                      ? "Bloquer"
                      : "Activer"}
                </button>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between text-xs text-muted">
            <span>
              Page {payload?.page ?? 1} / {totalPages}
            </span>
            <div className="flex gap-2">
              <button
                className="rounded-lg border border-ink/15 px-3 py-1"
                disabled={page <= 1}
                onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              >
                Prec
              </button>
              <button
                className="rounded-lg border border-ink/15 px-3 py-1"
                disabled={page >= totalPages}
                onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
              >
                Suiv
              </button>
            </div>
          </div>
        </section>
      </DashboardShell>
    </AuthGuard>
  );
}
