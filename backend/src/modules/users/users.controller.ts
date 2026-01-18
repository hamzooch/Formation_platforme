import { Body, Controller, Get, Param, Patch, Query } from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller("admin/users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  listUsers(
    @Query("search") search?: string,
    @Query("role") role?: "ADMIN" | "TRAINER" | "STUDENT",
    @Query("status") status?: "ACTIVE" | "BLOCKED" | "PENDING",
    @Query("page") page?: string,
    @Query("pageSize") pageSize?: string,
  ) {
    return this.usersService.listUsers({
      search,
      role,
      status,
      page: page ? Number(page) : undefined,
      pageSize: pageSize ? Number(pageSize) : undefined,
    });
  }

  @Patch(":id/status")
  updateStatus(
    @Param("id") id: string,
    @Body() body: { status: "active" | "blocked" | "pending" },
  ) {
    return this.usersService.updateStatus(id, body.status);
  }
}
