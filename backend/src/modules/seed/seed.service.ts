import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(private readonly prisma: PrismaService) {}
  private readonly logger = new Logger(SeedService.name);

  async onModuleInit() {
    try {
      const usersCount = await this.prisma.user.count();
      if (usersCount > 0) {
        return;
      }

      const admin = await this.prisma.user.create({
        data: {
          name: "Admin Test",
          email: "admin@digitechpro.test",
          passwordHash: "mock",
          role: "ADMIN",
          status: "ACTIVE",
        },
      });

      const trainer = await this.prisma.user.create({
        data: {
          name: "Formateur Test",
          email: "trainer@digitechpro.test",
          passwordHash: "mock",
          role: "TRAINER",
          status: "PENDING",
        },
      });

      await this.prisma.user.createMany({
        data: [
          {
            name: "Lina A.",
            email: "lina@digitechpro.test",
            passwordHash: "mock",
            role: "TRAINER",
            status: "ACTIVE",
          },
          {
            name: "Apprenant Test",
            email: "student@digitechpro.test",
            passwordHash: "mock",
            role: "STUDENT",
            status: "ACTIVE",
          },
          {
            name: "Karim B.",
            email: "karim@digitechpro.test",
            passwordHash: "mock",
            role: "STUDENT",
            status: "BLOCKED",
          },
        ],
      });

      await this.prisma.category.createMany({
        data: [
          { name: "Cloud & DevOps", slug: "cloud-devops", active: true },
          { name: "Web Moderne", slug: "web-moderne", active: true },
          { name: "IA & Data", slug: "ia-data", active: true },
          { name: "Product Design", slug: "product-design", active: false },
        ],
      });

      const course = await this.prisma.course.create({
        data: {
          title: "Full-Stack TypeScript",
          description: "Construire une application moderne de bout en bout.",
          status: "PUBLISHED",
          trainerId: trainer.id,
        },
      });

      await this.prisma.course.create({
        data: {
          title: "Architecte Logiciel Cloud",
          description: "Concevoir des architectures scalables.",
          status: "PUBLISHED",
          trainerId: trainer.id,
        },
      });

      await this.prisma.report.createMany({
        data: [
          {
            title: "Module 3 obsolette",
            courseTitle: course.title,
            severity: "Moyen",
            status: "Nouveau",
          },
          {
            title: "PDF corrompu",
            courseTitle: "Full-Stack TypeScript",
            severity: "Eleve",
            status: "En attente",
          },
          {
            title: "Video sans son",
            courseTitle: "UI Design Systeme",
            severity: "Faible",
            status: "Nouveau",
          },
        ],
      });

      await this.prisma.notification.createMany({
        data: [
          {
            userId: admin.id,
            type: "SYSTEM",
            title: "Maintenance planifiee",
            body: "Dimanche 02:00 - 03:00",
          },
          {
            userId: admin.id,
            type: "SUPPORT",
            title: "Nouveau ticket support",
            body: "Apprenant: acces cours",
          },
        ],
      });
    } catch (error) {
      this.logger.warn(
        "Seed skipped. MongoDB needs replica set for transactions. Start mongod with --replSet or disable seed.",
      );
    }
  }
}
