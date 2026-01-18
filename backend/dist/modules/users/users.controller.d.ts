import { UsersService } from "./users.service";
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    listUsers(): {
        message: string;
    };
    updateStatus(id: string, body: {
        status: "active" | "blocked" | "pending";
    }): {
        message: string;
        id: string;
        status: "active" | "blocked" | "pending";
    };
}
