import { Injectable } from "@nestjs/common";

@Injectable()
export class DashboardsService {
  adminStats() {
    return {
      stats: [
        { label: "Comptes a valider", value: "18" },
        { label: "Formations publiees", value: "128" },
        { label: "Signalements", value: "6" },
        { label: "Taux de completion", value: "91%" },
      ],
      alerts: [
        {
          title: "Validation formateur",
          detail: "2 nouveaux comptes en attente",
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
    };
  }

  trainerStats() {
    return {
      stats: [
        { label: "Formations actives", value: "3" },
        { label: "Apprenants inscrits", value: "497" },
        { label: "Progression moyenne", value: "71%" },
      ],
      courses: [
        {
          title: "Full-Stack TypeScript",
          status: "Publie",
          learners: 312,
          completion: "68%",
        },
        {
          title: "System Design pour SaaS",
          status: "Brouillon",
          learners: 0,
          completion: "-",
        },
        {
          title: "API NestJS avancees",
          status: "Publie",
          learners: 185,
          completion: "74%",
        },
      ],
      tasks: [
        "Finaliser le module 4 sur la scalabilite",
        "Repondre aux questions sur la lecon 2",
        "Uploader le support PDF version 3",
      ],
    };
  }

  studentStats() {
    return {
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
    };
  }
}
