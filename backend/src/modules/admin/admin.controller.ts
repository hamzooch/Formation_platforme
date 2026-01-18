import { Body, Controller, Get, Patch, Post, Query } from "@nestjs/common";
import { AdminService } from "./admin.service";

@Controller("admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get("categories")
  listCategories(
    @Query("search") search?: string,
    @Query("active") active?: string,
  ) {
    const activeValue = active === undefined ? undefined : active === "true";
    return this.adminService.listCategories({ search, active: activeValue });
  }

  @Post("categories")
  createCategory(@Body() body: { name: string }) {
    return this.adminService.createCategory(body);
  }

  @Patch("categories")
  updateCategory(@Body() body: { id: string; name?: string; active?: boolean }) {
    return this.adminService.updateCategory(body);
  }

  @Get("reports")
  listReports() {
    return this.adminService.listReports();
  }
}
