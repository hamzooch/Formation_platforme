import { CourseCard } from "../components/CourseCard";
import { StatCard } from "../components/StatCard";

const featured = [
  {
    title: "Architecte Logiciel Cloud",
    category: "Cloud & DevOps",
    lessons: 24,
    duration: "6h 30",
  },
  {
    title: "Full-Stack TypeScript",
    category: "Web Moderne",
    lessons: 32,
    duration: "8h 10",
  },
  {
    title: "Data & IA pour Produits",
    category: "IA & Analytics",
    lessons: 18,
    duration: "5h 20",
  },
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col gap-24">
      <section className="px-[7vw] pb-10 pt-20">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <p className="inline-flex rounded-full bg-[#fff3e8] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]">
              DigitechPro
            </p>
            <h1 className="mt-4 font-display text-[clamp(2.4rem,2.5vw+2rem,4rem)]">
              La plateforme qui transforme vos talents en expertise.
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              Creez, publiez et suivez des formations professionnelles avec une
              experience fluide pour les formateurs et les apprenants.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button className="rounded-xl bg-accent px-5 py-3 font-semibold text-white shadow-[0_8px_20px_rgba(244,107,63,0.25)]">
                Explorer le catalogue
              </button>
              <button className="rounded-xl border border-ink/20 px-5 py-3 font-semibold">
                Devenir formateur
              </button>
            </div>
          </div>
          <div className="hero-panel">
            <div className="rounded-3xl bg-white p-6 shadow-soft">
              <div className="flex items-center justify-between text-sm font-semibold">
                <p>Progression globale</p>
                <span>74%</span>
              </div>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#efe8de]">
                <div className="h-full w-[74%] rounded-full bg-gradient-to-r from-accent to-[#f89d5b]" />
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <StatCard label="Formations actives" value="128" />
                <StatCard label="Apprenants" value="4 830" />
                <StatCard label="Certifications" value="1 290" />
                <StatCard label="Taux de compl." value="91%" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-[7vw] pb-16">
        <div>
          <h2 className="text-[clamp(1.8rem,1vw+1.5rem,2.6rem)] font-semibold">
            Formations en vedette
          </h2>
          <p className="mt-2 text-muted">Des parcours concus pour des resultats concrets.</p>
        </div>
        <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((course) => (
            <CourseCard key={course.title} {...course} />
          ))}
        </div>
      </section>

      <section className="mx-[7vw] rounded-[32px] bg-[#161310] px-[7vw] pb-16 pt-12 text-[#f5efe6]">
        <div>
          <h2 className="text-[clamp(1.8rem,1vw+1.5rem,2.6rem)] font-semibold">
            Concu pour chaque role
          </h2>
          <p className="mt-2 text-[rgba(245,239,230,0.7)]">
            Un tableau de bord adapte a chaque acteur de la plateforme.
          </p>
        </div>
        <div className="mt-7 grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/10 p-5">
            <h3 className="text-lg font-semibold">Administrateur</h3>
            <p className="mt-2 text-sm text-white/70">
              Statistiques globales, moderation et validation des comptes.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/10 p-5">
            <h3 className="text-lg font-semibold">Formateur</h3>
            <p className="mt-2 text-sm text-white/70">
              Creation de cours, gestion des modules et suivi des apprenants.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/10 p-5">
            <h3 className="text-lg font-semibold">Apprenant</h3>
            <p className="mt-2 text-sm text-white/70">
              Catalogue personnalise, progression et suivi des objectifs.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
