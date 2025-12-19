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
exports.ReportsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const client_1 = require("@prisma/client");
let ReportsService = class ReportsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async dashboard() {
        const [users, parents, tutors, classesTotal, classesByStatus, paymentsByStatus, revenueConfirmed] = await Promise.all([
            this.prisma.user.count(),
            this.prisma.parent.count(),
            this.prisma.tutor.count(),
            this.prisma.class.count(),
            this.prisma.class.groupBy({ by: ['status'], _count: { status: true } }),
            this.prisma.payment.groupBy({ by: ['status'], _count: { status: true } }),
            this.prisma.payment.aggregate({ where: { status: client_1.PaymentStatus.CONFIRMED }, _sum: { amount: true } }),
        ]);
        const classesMap = {};
        for (const row of classesByStatus)
            classesMap[row.status] = row._count.status;
        const payMap = {};
        for (const row of paymentsByStatus)
            payMap[row.status] = row._count.status;
        return {
            users,
            parents,
            tutors,
            classesTotal,
            classesByStatus: classesMap,
            paymentsByStatus: payMap,
            revenueConfirmed: revenueConfirmed._sum.amount ?? 0,
        };
    }
    async classStatusSummary() {
        const rows = await this.prisma.class.groupBy({ by: ['status'], _count: { status: true } });
        const out = {
            PENDING: 0, APPROVED: 0, CLOSED: 0, CANCELLED: 0,
        };
        for (const r of rows)
            out[r.status] = r._count.status;
        return out;
    }
};
exports.ReportsService = ReportsService;
exports.ReportsService = ReportsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ReportsService);
//# sourceMappingURL=reports.service.js.map