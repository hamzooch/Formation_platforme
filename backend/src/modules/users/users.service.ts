import { Injectable } from "@nestjs/common";

@Injectable()
export class UsersService {
  listUsers() {
    return { message: "users list stub" };
  }

  updateStatus(id: string, status: "active" | "blocked" | "pending") {
    return { message: "update status stub", id, status };
  }
}
