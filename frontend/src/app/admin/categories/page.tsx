"use client";

import { useEffect, useMemo, useState } from "react";
import { AuthGuard } from "../../../components/AuthGuard";
import { DashboardShell } from "../../../components/DashboardShell";
import {
  AdminCategory,
  createCategory,
  fetchCategories,
  updateCategory,
} from "../../../lib/admin-api";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [search, setSearch] = useState("");
  const [active, setActive] = useState("");
  const [newName, setNewName] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchCategories({ search: search || undefined, active: active || undefined })
      .then((payload) => setCategories(payload.categories))
      .catch(() => setCategories([]));
  }, [search, active]);

  const totals = useMemo(() => {
    const total = categories.length;
    const inactive = categories.filter((item) => !item.active).length;
    return { total, inactive };
  }, [categories]);

  async function handleToggle(category: AdminCategory) {
    setBusyId(category.id);
    try {
      await updateCategory({ id: category.id, active: !category.active });
      setCategories((prev) =>
        prev.map((item) => (item.id === category.id ? { ...item, active: !item.active } : item)),
      );
    } finally {
      setBusyId(null);
    }
  }

  async function handleCreate() {
    if (!newName.trim()) {
      return;
    }
    setSaving(true);
    try {
      const result = await createCategory(newName.trim());
      setCategories((prev) => [result.category, ...prev]);
      setNewName("");
    } finally {
      setSaving(false);
    }
  }

  return (
    <AuthGuard role="ADMIN">
      <DashboardShell
        title="Categories"
        subtitle="Organisez les formations et pilotez l'offre DigitechPro."
        accent="Admin"
        role="ADMIN"
      >
        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-5 shadow-soft">
            <p className="text-xs uppercase tracking-[0.2em] text-muted">Total</p>
            <p className="mt-3 text-2xl font-semibold">{totals.total}</p>
          </div>
          <div className="rounded-2xl bg-white p-5 shadow-soft">
            <p className="text-xs uppercase tracking-[0.2em] text-muted">Desactivees</p>
            <p className="mt-3 text-2xl font-semibold">{totals.inactive}</p>
          </div>
          <div className="rounded-2xl bg-white p-5 shadow-soft">
            <p className="text-xs uppercase tracking-[0.2em] text-muted">Actions rapides</p>
            <div className="mt-3 flex gap-2">
              <input
                className="w-full rounded-xl border border-ink/10 px-3 py-2 text-sm"
                placeholder="Nouvelle categorie"
                value={newName}
                onChange={(event) => setNewName(event.target.value)}
              />
              <button
                className="rounded-xl bg-accent px-3 py-2 text-sm font-semibold text-white"
                disabled={saving}
                onClick={handleCreate}
              >
                {saving ? "..." : "Creer"}
              </button>
            </div>
          </div>
        </section>

        <section className="rounded-3xl bg-white p-6 shadow-soft">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-semibold">Liste des categories</h2>
            <div className="flex flex-wrap gap-2 text-xs">
              <input
                className="rounded-xl border border-ink/10 px-3 py-2"
                placeholder="Rechercher"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
              <select
                className="rounded-xl border border-ink/10 px-3 py-2"
                value={active}
                onChange={(event) => setActive(event.target.value)}
              >
                <option value="">Tous</option>
                <option value="true">Actives</option>
                <option value="false">Desactivees</option>
              </select>
            </div>
          </div>
          <div className="mt-4 grid gap-3">
            {categories.map((category) => (
              <div
                key={category.id}
                className="flex items-center justify-between rounded-2xl border border-ink/10 p-4"
              >
                <div>
                  <p className="text-sm font-semibold">{category.name}</p>
                  <p className="text-xs text-muted">
                    {category.active ? "Active" : "Desactivee"}
                  </p>
                </div>
                <button
                  className="rounded-xl border border-ink/15 px-3 py-2 text-xs font-semibold"
                  disabled={busyId === category.id}
                  onClick={() => handleToggle(category)}
                >
                  {busyId === category.id
                    ? "..."
                    : category.active
                      ? "Desactiver"
                      : "Activer"}
                </button>
              </div>
            ))}
          </div>
        </section>
      </DashboardShell>
    </AuthGuard>
  );
}
