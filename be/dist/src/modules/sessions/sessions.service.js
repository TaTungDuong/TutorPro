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
exports.SessionsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let SessionsService = class SessionsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        const cls = await this.prisma.class.findUnique({ where: { id: dto.classId } });
        if (!cls)
            throw new common_1.NotFoundException('Class not found');
        return this.prisma.session.create({
            data: {
                classId: dto.classId,
                date: new Date(dto.date),
                content: dto.content,
                attendance: dto.attendance,
                parentConfirm: dto.parentConfirm,
            },
        });
    }
    list(classId) {
        return this.prisma.session.findMany({
            where: classId ? { classId } : undefined,
            orderBy: { date: 'desc' },
        });
    }
    async get(id) {
        const s = await this.prisma.session.findUnique({
            where: { id },
            include: { complaints: true, class: true },
        });
        if (!s)
            throw new common_1.NotFoundException('Session not found');
        return s;
    }
    async update(id, dto) {
        const s = await this.prisma.session.findUnique({ where: { id } });
        if (!s)
            throw new common_1.NotFoundException('Session not found');
        return this.prisma.session.update({
            where: { id },
            data: {
                date: dto.date ? new Date(dto.date) : undefined,
                content: dto.content,
                attendance: dto.attendance,
                parentConfirm: dto.parentConfirm,
            },
        });
    }
    async parentConfirm(id) {
        const s = await this.prisma.session.findUnique({ where: { id } });
        if (!s)
            throw new common_1.NotFoundException('Session not found');
        return this.prisma.session.update({ where: { id }, data: { parentConfirm: 1 } });
    }
    async remove(id) {
        const s = await this.prisma.session.findUnique({ where: { id } });
        if (!s)
            throw new common_1.NotFoundException('Session not found');
        await this.prisma.session.delete({ where: { id } });
        return { ok: true };
    }
};
exports.SessionsService = SessionsService;
exports.SessionsService = SessionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SessionsService);
//# sourceMappingURL=sessions.service.js.map