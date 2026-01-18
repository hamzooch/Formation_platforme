import { Injectable } from "@nestjs/common";

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
}
