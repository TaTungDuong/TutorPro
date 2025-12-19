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
exports.ParentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const bcrypt = require("bcryptjs");
const client_1 = require("@prisma/client");
let ParentsService = class ParentsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        const exists = await this.prisma.user.findUnique({ where: { email: dto.email } });
        if (exists)
            throw new common_1.BadRequestException('Email already exists');
        const password = await bcrypt.hash(dto.password, 10);
        return this.prisma.parent.create({
            data: {
                user: { create: { email: dto.email, password, role: client_1.UserRole.PARENT } },
                phone: dto.phone,
                address: dto.address,
                name: dto.name,
            },
            include: { user: { select: { id: true, email: true, role: true, status: true } } },
        });
    }
    list() {
        return this.prisma.parent.findMany({
            include: { user: { select: { id: true, email: true, role: true, status: true } } },
            orderBy: { id: 'asc' },
        });
    }
    async get(id) {
        const p = await this.prisma.parent.findUnique({
            where: { id },
            include: { user: { select: { id: true, email: true, role: true, status: true } } },
        });
        if (!p)
            throw new common_1.NotFoundException('Parent not found');
        return p;
    }
    async update(id, dto) {
        const p = await this.prisma.parent.findUnique({ where: { id }, include: { user: true } });
        if (!p)
            throw new common_1.NotFoundException('Parent not found');
        const userData = {};
        if (dto.email)
            userData.email = dto.email;
        if (dto.password)
            userData.password = await bcrypt.hash(dto.password, 10);
        return this.prisma.parent.update({
            where: { id },
            data: {
                phone: dto.phone,
                address: dto.address,
                name: dto.name,
                user: Object.keys(userData).length ? { update: userData } : undefined,
            },
            include: { user: { select: { id: true, email: true, role: true, status: true } } },
        });
    }
    async remove(id) {
        const p = await this.prisma.parent.findUnique({ where: { id } });
        if (!p)
            throw new common_1.NotFoundException('Parent not found');
        await this.prisma.parent.delete({ where: { id } });
        return { ok: true };
    }
};
exports.ParentsService = ParentsService;
exports.ParentsService = ParentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ParentsService);
//# sourceMappingURL=parents.service.js.map