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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const bcrypt = require("bcryptjs");
let UsersService = class UsersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        const exists = await this.prisma.user.findUnique({ where: { email: dto.email } });
        if (exists)
            throw new common_1.BadRequestException('Email already exists');
        const password = await bcrypt.hash(dto.password, 10);
        return this.prisma.user.create({
            data: {
                email: dto.email,
                password,
                role: dto.role,
                status: dto.status ?? undefined,
            },
            select: { id: true, email: true, role: true, status: true, createdAt: true, updatedAt: true },
        });
    }
    list() {
        return this.prisma.user.findMany({
            orderBy: { id: 'asc' },
            select: { id: true, email: true, role: true, status: true, createdAt: true, updatedAt: true },
        });
    }
    async get(id) {
        const u = await this.prisma.user.findUnique({
            where: { id },
            select: { id: true, email: true, role: true, status: true, createdAt: true, updatedAt: true },
        });
        if (!u)
            throw new common_1.NotFoundException('User not found');
        return u;
    }
    async update(id, dto) {
        const found = await this.prisma.user.findUnique({ where: { id } });
        if (!found)
            throw new common_1.NotFoundException('User not found');
        const data = { ...dto };
        if (dto.password)
            data.password = await bcrypt.hash(dto.password, 10);
        return this.prisma.user.update({
            where: { id },
            data,
            select: { id: true, email: true, role: true, status: true, createdAt: true, updatedAt: true },
        });
    }
    async remove(id) {
        const found = await this.prisma.user.findUnique({ where: { id } });
        if (!found)
            throw new common_1.NotFoundException('User not found');
        await this.prisma.user.delete({ where: { id } });
        return { ok: true };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map