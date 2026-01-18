import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class DashboardsService {
  constructor(private readonly prisma: PrismaService) {}

  adminStats() {
    return Promise.all([
      this.prisma.user.count({ where: { role: "TRAINER", status: "PENDING" } }),
      this.prisma.course.count({ where: { status: "PUBLISHED" } }),
      this.prisma.report.count(),
      this.prisma.user.findFirst({ where: { role: "ADMIN" } }),
    ]).then(async ([pendingTrainers, publishedCourses, reportsCount, admin]) => {
      const notifications = admin
        ? await this.prisma.notification.findMany({
            where: { userId: admin.id },
            orderBy: { createdAt: "desc" },
            take: 3,
          })
        : [];

      return {
        stats: [
          { label: "Comptes a valider", value: String(pendingTrainers) },
          { label: "Formations publiees", value: String(publishedCourses) },
          { label: "Signalements", value: String(reportsCount) },
          { label: "Taux de completion", value: "91%" },
        ],
        alerts: [
          {
            title: "Validation formateur",
            detail: `${pendingTrainers} comptes en attente`,
            tag: "Prioritaire",
          },
          {
            title: "Categorie a revoir",
            detail: "Data & IA demande une fusion",
            tag: "A verifier",
          },
          {
            title: "Cours signale",
            detail: "Module 3 - contenu obsolette",
            tag: "Moderation",
          },
        ],
        overview: [
          { label: "Activite hebdo", value: "+24% inscriptions" },
          { label: "Contenu a moderer", value: "12 elements" },
          { label: "Temps moyen cours", value: "46 min" },
          { label: "Nouveaux formateurs", value: "+8 ce mois" },
        ],
        activity: [
          {
            title: "Nouvelle formation publiee",
            detail: "API NestJS avancees",
            time: "Il y a 2h",
          },
          {
            title: "Formateur valide",
            detail: "Lina A. (trainer)",
            time: "Il y a 4h",
          },
          {
            title: "Categorie archivee",
            detail: "Product Design",
            time: "Hier",
          },
        ],
        notifications: notifications.map((note) => ({
          title: note.title,
          detail: note.body,
        })),
      };
    });
  }

  trainerStats() {
    return this.prisma.user
      .findFirst({ where: { role: "TRAINER" } })
      .then(async (trainer) => {
        const courses = trainer
          ? await this.prisma.course.findMany({
              where: { trainerId: trainer.id },
              orderBy: { createdAt: "desc" },
            })
          : [];

        return {
          stats: [
            { label: "Formations actives", value: String(courses.length) },
            { label: "Apprenants inscrits", value: "497" },
            { label: "Progression moyenne", value: "71%" },
          ],
          courses: courses.map((course) => ({
            id: course.id,
            title: course.title,
            status: course.status === "PUBLISHED" ? "Publie" : "Brouillon",
            learners: 0,
            completion: "-",
          })),
          tasks: [
            "Finaliser le module 4 sur la scalabilite",
            "Repondre aux questions sur la lecon 2",
            "Uploader le support PDF version 3",
          ],
          modules: [
            {
              course: courses[0]?.title ?? "Full-Stack TypeScript",
              title: "Module 3 - API avancees",
              lessons: 6,
              status: "En cours",
            },
            {
              course: courses[1]?.title ?? "API NestJS avancees",
              title: "Module 1 - Introduction",
              lessons: 4,
              status: "Publie",
            },
          ],
          mediaQueue: [
            {
              name: "support-architecture.pdf",
              type: "PDF",
              status: "A traiter",
            },
            {
              name: "lesson-12.mp4",
              type: "Video",
              status: "Upload termine",
            },
          ],
          learners: [
            {
              name: "Karim B.",
              course: courses[0]?.title ?? "Full-Stack TypeScript",
              progress: "54%",
            },
            {
              name: "Nora P.",
              course: courses[1]?.title ?? "API NestJS avancees",
              progress: "82%",
            },
            {
              name: "Yassine T.",
              course: courses[0]?.title ?? "Full-Stack TypeScript",
              progress: "33%",
            },
          ],
          revenue: {
            month: "12 480 EUR",
            growth: "+18%",
            pending: "1 250 EUR",
          },
          notifications: [
            {
              title: "Nouveau commentaire",
              detail: "Lecon 4 - question sur l'exercice",
            },
            {
              title: "Evaluation terminee",
              detail: "Cours Full-Stack TypeScript",
            },
          ],
        };
      });
  }

  studentStats() {
    return this.prisma.course.findMany({ orderBy: { createdAt: "desc" }, take: 3 }).then(
      (courses) => ({
        stats: [
          { label: "Formations en cours", value: "3" },
          { label: "Lecons terminees", value: "26" },
          { label: "Objectifs semaine", value: "2/4" },
        ],
        enrolled: [
          {
            title: "Architecte Logiciel Cloud",
            module: "Module 2/6",
            progress: "42%",
          },
          {
            title: "UI Design Systeme",
            module: "Module 4/5",
            progress: "78%",
          },
          {
            title: "Data & IA pour Produits",
            module: "Module 1/4",
            progress: "22%",
          },
        ],
        nextLessons: [
          {
            title: "Caching et latence",
            course: "Architecte Logiciel Cloud",
            duration: "18 min",
          },
          {
            title: "Typographie expressive",
            course: "UI Design Systeme",
            duration: "24 min",
          },
          {
            title: "Introduction aux features IA",
            course: "Data & IA pour Produits",
            duration: "16 min",
          },
        ],
        catalog: courses.map((course) => ({
          title: course.title,
          category: "General",
          duration: "4h 00",
        })),
        resume: {
          title: "UI Design Systeme",
          lesson: "Lecon 12 - Grille et rythme",
          progress: "78%",
        },
        certificates: [
          {
            title: "Fundamentals UX",
            date: "10 Jan 2026",
          },
          {
            title: "DevOps Essentials",
            date: "02 Dec 2025",
          },
        ],
        notifications: [
          {
            title: "Nouveau module disponible",
            detail: "Architecte Logiciel Cloud",
          },
          {
            title: "Rappel objectif",
            detail: "2 lecons a terminer cette semaine",
          },
        ],
      }),
    );
  }
}
