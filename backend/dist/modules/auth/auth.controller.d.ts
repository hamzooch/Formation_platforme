import { AuthService } from "./auth.service";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(body: {
        email: string;
        password: string;
        name: string;
    }): {
        message: string;
        body: {
            email: string;
            password: string;
            name: string;
        };
    };
    login(body: {
        email: string;
        password: string;
    }): {
        message: string;
        body: {
            email: string;
            password: string;
        };
    };
    refresh(body: {
        refreshToken: string;
    }): {
        message: string;
        body: {
            refreshToken: string;
        };
    };
    mockLogin(body: {
        email: string;
        role: "ADMIN" | "TRAINER" | "STUDENT";
    }): {
        error: string;
        token?: undefined;
        user?: undefined;
    } | {
        token: string;
        user: import("./mock-users").MockUser;
        error?: undefined;
    };
}
