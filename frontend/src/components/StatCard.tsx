type StatCardProps = {
  label: string;
  value: string;
};

export function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="rounded-2xl bg-[#fef6ed] p-3">
      <p className="text-xs text-muted">{label}</p>
      <strong className="text-lg">{value}</strong>
    </div>
  );
}
