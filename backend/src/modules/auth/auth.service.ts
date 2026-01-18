import { Injectable } from "@nestjs/common";
import { MOCK_USERS } from "./mock-users";

@Injectable()
export class AuthService {
  register(body: { email: string; password: string; name: string }) {
    return { message: "register stub", body };
  }

  login(body: { email: string; password: string }) {
    return { message: "login stub", body };
  }

  refresh(body: { refreshToken: string }) {
    return { message: "refresh stub", body };
  }

  mockLogin(body: { email: string; role: "ADMIN" | "TRAINER" | "STUDENT" }) {
    const user = MOCK_USERS.find(
      (candidate) => candidate.email === body.email && candidate.role === body.role,
    );

    if (!user) {
      return { error: "Invalid mock credentials" };
    }

    return {
      token: `mock-${user.id}`,
      user,
    };
  }
}
