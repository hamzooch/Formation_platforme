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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardsController = void 0;
const common_1 = require("@nestjs/common");
const dashboards_service_1 = require("./dashboards.service");
let DashboardsController = class DashboardsController {
    constructor(dashboardsService) {
        this.dashboardsService = dashboardsService;
    }
    adminStats() {
        return this.dashboardsService.adminStats();
    }
    trainerStats() {
        return this.dashboardsService.trainerStats();
    }
    studentStats() {
        return this.dashboardsService.studentStats();
    }
};
exports.DashboardsController = DashboardsController;
__decorate([
    (0, common_1.Get)("admin"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DashboardsController.prototype, "adminStats", null);
__decorate([
    (0, common_1.Get)("trainer"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DashboardsController.prototype, "trainerStats", null);
__decorate([
    (0, common_1.Get)("student"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DashboardsController.prototype, "studentStats", null);
exports.DashboardsController = DashboardsController = __decorate([
    (0, common_1.Controller)("dashboard"),
    __metadata("design:paramtypes", [dashboards_service_1.DashboardsService])
], DashboardsController);
//# sourceMappingURL=dashboards.controller.js.map