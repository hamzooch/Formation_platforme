"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var SeedService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let SeedService = SeedService_1 = class SeedService {
    constructor(prisma) {
        this.prisma = prisma;
        this.logger = new common_1.Logger(SeedService_1.name);
    }
    async onModuleInit() {
        try {
            const usersCount = await this.prisma.user.count();
            if (usersCount > 0) {
                return;
            }
            const admin = await this.prisma.user.create({
                data: {
                    name: "Admin Test",
                    email: "admin@digitechpro.test",
                    passwordHash: "mock",
                    role: "ADMIN",
                    status: "ACTIVE",
                },
            });
            const trainer = await this.prisma.user.create({
                data: {
                    name: "Formateur Test",
                    email: "trainer@digitechpro.test",
                    passwordHash: "mock",
                    role: "TRAINER",
                    status: "PENDING",
                },
            });
            await this.prisma.user.createMany({
                data: [
                    {
                        name: "Lina A.",
                        email: "lina@digitechpro.test",
                        passwordHash: "mock",
                        role: "TRAINER",
                        status: "ACTIVE",
                    },
                    {
                        name: "Apprenant Test",
                        email: "student@digitechpro.test",
                        passwordHash: "mock",
                        role: "STUDENT",
                        status: "ACTIVE",
                    },
                    {
                        name: "Karim B.",
                        email: "karim@digitechpro.test",
                        passwordHash: "mock",
                        role: "STUDENT",
                        status: "BLOCKED",
                    },
                ],
            });
            await this.prisma.category.createMany({
                data: [
                    { name: "Cloud & DevOps", slug: "cloud-devops", active: true },
                    { name: "Web Moderne", slug: "web-moderne", active: true },
                    { name: "IA & Data", slug: "ia-data", active: true },
                    { name: "Product Design", slug: "product-design", active: false },
                ],
            });
            const course = await this.prisma.course.create({
                data: {
                    title: "Full-Stack TypeScript",
                    description: "Construire une application moderne de bout en bout.",
                    status: "PUBLISHED",
                    trainerId: trainer.id,
                },
            });
            await this.prisma.course.create({
                data: {
                    title: "Architecte Logiciel Cloud",
                    description: "Concevoir des architectures scalables.",
                    status: "PUBLISHED",
                    trainerId: trainer.id,
                },
            });
            await this.prisma.report.createMany({
                data: [
                    {
                        title: "Module 3 obsolette",
                        courseTitle: course.title,
                        severity: "Moyen",
                        status: "Nouveau",
                    },
                    {
                        title: "PDF corrompu",
                        courseTitle: "Full-Stack TypeScript",
                        severity: "Eleve",
                        status: "En attente",
                    },
                    {
                        title: "Video sans son",
                        courseTitle: "UI Design Systeme",
                        severity: "Faible",
                        status: "Nouveau",
                    },
                ],
            });
            await this.prisma.notification.createMany({
                data: [
                    {
                        userId: admin.id,
                        type: "SYSTEM",
                        title: "Maintenance planifiee",
                        body: "Dimanche 02:00 - 03:00",
                    },
                    {
                        userId: admin.id,
                        type: "SUPPORT",
                        title: "Nouveau ticket support",
                        body: "Apprenant: acces cours",
                    },
                ],
            });
        }
        catch (error) {
            this.logger.warn("Seed skipped. MongoDB needs replica set for transactions. Start mongod with --replSet or disable seed.");
        }
    }
};
exports.SeedService = SeedService;
exports.SeedService = SeedService = SeedService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SeedService);
//# sourceMappingURL=seed.service.js.map