import { PrismaService } from "../../prisma/prisma.service";
export declare class DashboardsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    adminStats(): Promise<{
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
        activity: {
            title: string;
            detail: string;
            time: string;
        }[];
        notifications: {
            title: string;
            detail: string;
        }[];
    }>;
    trainerStats(): Promise<{
        stats: {
            label: string;
            value: string;
        }[];
        courses: {
            id: string;
            title: string;
            status: string;
            learners: number;
            completion: string;
        }[];
        tasks: string[];
        modules: {
            course: string;
            title: string;
            lessons: number;
            status: string;
        }[];
        mediaQueue: {
            name: string;
            type: string;
            status: string;
        }[];
        learners: {
            name: string;
            course: string;
            progress: string;
        }[];
        revenue: {
            month: string;
            growth: string;
            pending: string;
        };
        notifications: {
            title: string;
            detail: string;
        }[];
    }>;
    studentStats(): Promise<{
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
        catalog: {
            title: string;
            category: string;
            duration: string;
        }[];
        resume: {
            title: string;
            lesson: string;
            progress: string;
        };
        certificates: {
            title: string;
            date: string;
        }[];
        notifications: {
            title: string;
            detail: string;
        }[];
    }>;
}
