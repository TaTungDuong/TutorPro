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
exports.ClassesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const client_1 = require("@prisma/client");
let ClassesService = class ClassesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        try {
            return await this.prisma.class.create({ data: dto });
        }
        catch {
            throw new common_1.BadRequestException('classID already exists');
        }
    }
    list(filters) {
        return this.prisma.class.findMany({
            where: {
                status: filters.status,
                parentId: filters.parentId,
                staffId: filters.staffId,
            },
            include: { parent: true, staff: true },
            orderBy: { id: 'desc' },
        });
    }
    async get(id) {
        const c = await this.prisma.class.findUnique({
            where: { id },
            include: {
                parent: true,
                staff: true,
                applications: { include: { tutor: true } },
                contract: true,
                sessions: true,
                payments: true,
                studentLinks: { include: { student: true } },
            },
        });
        if (!c)
            throw new common_1.NotFoundException('Class not found');
        return c;
    }
    async update(id, dto) {
        const c = await this.prisma.class.findUnique({ where: { id } });
        if (!c)
            throw new common_1.NotFoundException('Class not found');
        return this.prisma.class.update({ where: { id }, data: dto });
    }
    async remove(id) {
        const c = await this.prisma.class.findUnique({ where: { id } });
        if (!c)
            throw new common_1.NotFoundException('Class not found');
        await this.prisma.class.delete({ where: { id } });
        return { ok: true };
    }
    async approve(id, staffId) {
        const c = await this.prisma.class.findUnique({ where: { id } });
        if (!c)
            throw new common_1.NotFoundException('Class not found');
        return this.prisma.class.update({
            where: { id },
            data: { status: client_1.ClassStatus.APPROVED, staffId },
        });
    }
    async close(id) {
        const c = await this.prisma.class.findUnique({ where: { id } });
        if (!c)
            throw new common_1.NotFoundException('Class not found');
        return this.prisma.class.update({
            where: { id },
            data: { status: client_1.ClassStatus.CLOSED },
        });
    }
};
exports.ClassesService = ClassesService;
exports.ClassesService = ClassesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ClassesService);
//# sourceMappingURL=classes.service.js.map