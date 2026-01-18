import { UsersService } from "./users.service";
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    listUsers(search?: string, role?: "ADMIN" | "TRAINER" | "STUDENT", status?: "ACTIVE" | "BLOCKED" | "PENDING", page?: string, pageSize?: string): Promise<{
        users: {
            id: string;
            createdAt: Date;
            name: string;
            status: import(".prisma/client").$Enums.UserStatus;
            role: import(".prisma/client").$Enums.UserRole;
            email: string;
        }[];
        page: number;
        pageSize: number;
        total: number;
    }>;
    updateStatus(id: string, body: {
        status: "active" | "blocked" | "pending";
    }): Promise<{
        message: string;
        user: {
            id: string;
            status: import(".prisma/client").$Enums.UserStatus;
        };
    }>;
}
