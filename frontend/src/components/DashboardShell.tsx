type DashboardShellProps = {
  title: string;
  subtitle: string;
  accent: string;
  children: React.ReactNode;
};

export function DashboardShell({ title, subtitle, accent, children }: DashboardShellProps) {
  return (
    <main className="min-h-screen bg-cream text-ink">
      <div className="mx-auto max-w-6xl px-6 pb-16 pt-10">
        <div className="flex flex-col gap-4 rounded-3xl bg-white/90 p-8 shadow-soft">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-muted">{accent}</p>
              <h1 className="mt-2 text-3xl font-semibold">{title}</h1>
              <p className="mt-2 text-sm text-muted">{subtitle}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button className="rounded-xl border border-ink/15 px-4 py-2 text-sm font-semibold">
                Exporter
              </button>
              <button className="rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-white">
                Nouvelle action
              </button>
            </div>
          </div>
        </div>
        <div className="mt-8 grid gap-6">
          {children}
        </div>
      </div>
    </main>
  );
}
