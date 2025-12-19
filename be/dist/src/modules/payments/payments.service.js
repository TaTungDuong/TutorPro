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
exports.PaymentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const client_1 = require("@prisma/client");
let PaymentsService = class PaymentsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        const cls = await this.prisma.class.findUnique({ where: { id: dto.classId } });
        if (!cls)
            throw new common_1.NotFoundException('Class not found');
        const parent = await this.prisma.parent.findUnique({ where: { id: dto.payerId } });
        if (!parent)
            throw new common_1.NotFoundException('Parent not found');
        return this.prisma.payment.create({ data: dto });
    }
    list(filters) {
        return this.prisma.payment.findMany({
            where: filters,
            include: { class: true, parent: true },
            orderBy: { id: 'desc' },
        });
    }
    async confirm(id, confirmer) {
        const p = await this.prisma.payment.findUnique({ where: { id } });
        if (!p)
            throw new common_1.NotFoundException('Payment not found');
        return this.prisma.payment.update({
            where: { id },
            data: { status: client_1.PaymentStatus.CONFIRMED, confirmer, confirmTime: new Date() },
        });
    }
    async reject(id, confirmer) {
        const p = await this.prisma.payment.findUnique({ where: { id } });
        if (!p)
            throw new common_1.NotFoundException('Payment not found');
        return this.prisma.payment.update({
            where: { id },
            data: { status: client_1.PaymentStatus.REJECTED, confirmer, confirmTime: new Date() },
        });
    }
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService = PaymentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PaymentsService);
//# sourceMappingURL=payments.service.js.map