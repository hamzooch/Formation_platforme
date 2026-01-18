type CourseCardProps = {
  title: string;
  category: string;
  lessons: number;
  duration: string;
};

export function CourseCard({ title, category, lessons, duration }: CourseCardProps) {
  return (
    <div className="grid gap-4 rounded-2xl bg-white p-5 shadow-soft">
      <span className="w-fit rounded-full bg-[#f0f7ff] px-3 py-1 text-xs font-semibold text-accent2">
        {category}
      </span>
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="flex items-center justify-between text-sm text-muted">
        <span>{lessons} lecons</span>
        <span>{duration}</span>
      </div>
      <button className="w-fit rounded-xl bg-accent2 px-4 py-2 text-sm font-semibold text-white">
        Voir le programme
      </button>
    </div>
  );
}
