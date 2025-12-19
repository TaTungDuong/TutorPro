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
exports.StudentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let StudentsService = class StudentsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        return this.prisma.student.create({ data: dto });
    }
    list(parentId) {
        return this.prisma.student.findMany({
            where: parentId ? { parentId } : undefined,
            orderBy: { id: 'asc' },
        });
    }
    async get(id) {
        const s = await this.prisma.student.findUnique({
            where: { id },
            include: { classLinks: { include: { class: true } } },
        });
        if (!s)
            throw new common_1.NotFoundException('Student not found');
        return s;
    }
    async update(id, dto) {
        const s = await this.prisma.student.findUnique({ where: { id } });
        if (!s)
            throw new common_1.NotFoundException('Student not found');
        return this.prisma.student.update({ where: { id }, data: dto });
    }
    async remove(id) {
        const s = await this.prisma.student.findUnique({ where: { id } });
        if (!s)
            throw new common_1.NotFoundException('Student not found');
        await this.prisma.student.delete({ where: { id } });
        return { ok: true };
    }
    async assignToClass(dto) {
        const student = await this.prisma.student.findUnique({ where: { id: dto.studentId } });
        if (!student)
            throw new common_1.NotFoundException('Student not found');
        const cls = await this.prisma.class.findUnique({ where: { id: dto.classId } });
        if (!cls)
            throw new common_1.NotFoundException('Class not found');
        try {
            return await this.prisma.studentClass.create({ data: dto });
        }
        catch {
            throw new common_1.BadRequestException('Student already assigned to this class');
        }
    }
    async unassign(studentId, classId) {
        const link = await this.prisma.studentClass.findUnique({
            where: { studentId_classId: { studentId, classId } },
        });
        if (!link)
            throw new common_1.NotFoundException('Link not found');
        await this.prisma.studentClass.delete({ where: { studentId_classId: { studentId, classId } } });
        return { ok: true };
    }
};
exports.StudentsService = StudentsService;
exports.StudentsService = StudentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], StudentsService);
//# sourceMappingURL=students.service.js.map