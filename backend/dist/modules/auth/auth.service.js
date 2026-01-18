"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mock_users_1 = require("./mock-users");
let AuthService = class AuthService {
    register(body) {
        return { message: "register stub", body };
    }
    login(body) {
        return { message: "login stub", body };
    }
    refresh(body) {
        return { message: "refresh stub", body };
    }
    mockLogin(body) {
        const user = mock_users_1.MOCK_USERS.find((candidate) => candidate.email === body.email && candidate.role === body.role);
        if (!user) {
            return { error: "Invalid mock credentials" };
        }
        return {
            token: `mock-${user.id}`,
            user,
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)()
], AuthService);
//# sourceMappingURL=auth.service.js.map