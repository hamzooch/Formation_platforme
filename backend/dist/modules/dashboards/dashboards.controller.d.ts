import { DashboardsService } from "./dashboards.service";
export declare class DashboardsController {
    private readonly dashboardsService;
    constructor(dashboardsService: DashboardsService);
    adminStats(): {
        stats: {
            label: string;
            value: string;
        }[];
        alerts: {
            title: string;
            detail: string;
            tag: string;
        }[];
        overview: {
            label: string;
            value: string;
        }[];
    };
    trainerStats(): {
        stats: {
            label: string;
            value: string;
        }[];
        courses: {
            title: string;
            status: string;
            learners: number;
            completion: string;
        }[];
        tasks: string[];
    };
    studentStats(): {
        stats: {
            label: string;
            value: string;
        }[];
        enrolled: {
            title: string;
            module: string;
            progress: string;
        }[];
        nextLessons: {
            title: string;
            course: string;
            duration: string;
        }[];
    };
}
