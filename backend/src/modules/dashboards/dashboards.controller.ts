import { Controller, Get } from "@nestjs/common";
import { DashboardsService } from "./dashboards.service";

@Controller("dashboard")
export class DashboardsController {
  constructor(private readonly dashboardsService: DashboardsService) {}

  @Get("admin")
  adminStats() {
    return this.dashboardsService.adminStats();
  }

  @Get("trainer")
  trainerStats() {
    return this.dashboardsService.trainerStats();
  }

  @Get("student")
  studentStats() {
    return this.dashboardsService.studentStats();
  }
}
