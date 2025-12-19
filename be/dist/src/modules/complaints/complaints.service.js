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
exports.ComplaintsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let ComplaintsService = class ComplaintsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        const session = await this.prisma.session.findUnique({ where: { id: dto.sessionId } });
        if (!session)
            throw new common_1.NotFoundException('Session not found');
        return this.prisma.complaint.create({ data: dto });
    }
    list(sessionId) {
        return this.prisma.complaint.findMany({
            where: sessionId ? { sessionId } : undefined,
            include: { session: true },
            orderBy: { id: 'desc' },
        });
    }
    async get(id) {
        const c = await this.prisma.complaint.findUnique({ where: { id }, include: { session: true } });
        if (!c)
            throw new common_1.NotFoundException('Complaint not found');
        return c;
    }
    async update(id, dto) {
        const c = await this.prisma.complaint.findUnique({ where: { id } });
        if (!c)
            throw new common_1.NotFoundException('Complaint not found');
        return this.prisma.complaint.update({ where: { id }, data: dto });
    }
    async remove(id) {
        const c = await this.prisma.complaint.findUnique({ where: { id } });
        if (!c)
            throw new common_1.NotFoundException('Complaint not found');
        await this.prisma.complaint.delete({ where: { id } });
        return { ok: true };
    }
};
exports.ComplaintsService = ComplaintsService;
exports.ComplaintsService = ComplaintsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ComplaintsService);
//# sourceMappingURL=complaints.service.js.map