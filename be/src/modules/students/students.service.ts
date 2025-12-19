import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { AssignStudentClassDto } from './dto/assign-student-class.dto';

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateStudentDto) {
    return this.prisma.student.create({ data: dto });
  }

  list(parentId?: number) {
    return this.prisma.student.findMany({
      where: parentId ? { parentId } : undefined,
      orderBy: { id: 'asc' },
    });
  }

  async get(id: number) {
    const s = await this.prisma.student.findUnique({
      where: { id },
      include: { classLinks: { include: { class: true } } },
    });
    if (!s) throw new NotFoundException('Student not found');
    return s;
  }

  async update(id: number, dto: UpdateStudentDto) {
    const s = await this.prisma.student.findUnique({ where: { id } });
    if (!s) throw new NotFoundException('Student not found');
    return this.prisma.student.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    const s = await this.prisma.student.findUnique({ where: { id } });
    if (!s) throw new NotFoundException('Student not found');
    await this.prisma.student.delete({ where: { id } });
    return { ok: true };
  }

  async assignToClass(dto: AssignStudentClassDto) {
    const student = await this.prisma.student.findUnique({ where: { id: dto.studentId } });
    if (!student) throw new NotFoundException('Student not found');

    const cls = await this.prisma.class.findUnique({ where: { id: dto.classId } });
    if (!cls) throw new NotFoundException('Class not found');

    try {
      return await this.prisma.studentClass.create({ data: dto });
    } catch {
      throw new BadRequestException('Student already assigned to this class');
    }
  }

  async unassign(studentId: number, classId: number) {
    const link = await this.prisma.studentClass.findUnique({
      where: { studentId_classId: { studentId, classId } },
    });
    if (!link) throw new NotFoundException('Link not found');
    await this.prisma.studentClass.delete({ where: { studentId_classId: { studentId, classId } } });
    return { ok: true };
  }
}
