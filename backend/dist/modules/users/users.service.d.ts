export declare class UsersService {
    listUsers(): {
        message: string;
    };
    updateStatus(id: string, status: "active" | "blocked" | "pending"): {
        message: string;
        id: string;
        status: "active" | "blocked" | "pending";
    };
}
