import { AdminService } from "./admin.service";
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    listCategories(search?: string, active?: string): Promise<{
        categories: {
            id: string;
            name: string;
            active: boolean;
        }[];
    }>;
    createCategory(body: {
        name: string;
    }): Promise<{
        message: string;
        category: {
            id: string;
            name: string;
            active: boolean;
        };
    }>;
    updateCategory(body: {
        id: string;
        name?: string;
        active?: boolean;
    }): Promise<{
        message: string;
        category: {
            id: string;
            name: string;
            active: boolean;
        };
    }>;
    listReports(): Promise<{
        reports: {
            id: string;
            title: string;
            course: string;
            severity: string;
            status: string;
        }[];
    }>;
}
