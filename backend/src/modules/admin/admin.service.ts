import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { NotificationsService } from "../notifications/notifications.service";

@Injectable()
export class AdminService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notifications: NotificationsService,
  ) {}

  listCategories(filters?: { search?: string; active?: boolean }) {
    const where = {
      name: filters?.search
        ? {
            contains: filters.search,
            mode: "insensitive" as const,
          }
        : undefined,
      active: filters?.active,
    };

    return this.prisma.category
      .findMany({ where, orderBy: { name: "asc" } })
      .then((categories) => ({
        categories: categories.map((category) => ({
          id: category.id,
          name: category.name,
          active: category.active,
        })),
      }));
  }

  createCategory(body: { name: string }) {
    const slug = body.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    return this.prisma.category
      .create({ data: { name: body.name, slug } })
      .then(async (category) => {
        await this.notifications.pushToAdmin(
          "Categorie creee",
          `La categorie ${category.name} est disponible.`,
        );

        return {
          message: "category created",
          category: { id: category.id, name: category.name, active: true },
        };
      });
  }

  updateCategory(body: { id: string; name?: string; active?: boolean }) {
    const name = body.name ?? undefined;
    const slug = name
      ? name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "")
      : undefined;

    return this.prisma.category
      .update({
        where: { id: body.id },
        data: { name, slug, active: body.active },
      })
      .then(async (category) => {
        await this.notifications.pushToAdmin(
          "Categorie mise a jour",
          `La categorie ${category.name} a ete modifiee.`,
        );

        return {
          message: "category updated",
          category: { id: category.id, name: category.name, active: category.active },
        };
      });
  }

  listReports() {
    return this.prisma.report.findMany({ orderBy: { createdAt: "desc" } }).then((reports) => ({
      reports: reports.map((report) => ({
        id: report.id,
        title: report.title,
        course: report.courseTitle,
        severity: report.severity,
        status: report.status,
      })),
    }));
  }
}
