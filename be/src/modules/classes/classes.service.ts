import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { ClassStatus } from '@prisma/client';

@Injectable()
export class ClassesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateClassDto) {
    try {
      return await this.prisma.class.create({ data: dto });
    } catch {
      throw new BadRequestException('classID already exists');
    }
  }

  list(filters: { status?: ClassStatus; parentId?: number; staffId?: number }) {
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

  async get(id: number) {
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
    if (!c) throw new NotFoundException('Class not found');
    return c;
  }

  async update(id: number, dto: UpdateClassDto) {
    const c = await this.prisma.class.findUnique({ where: { id } });
    if (!c) throw new NotFoundException('Class not found');
    return this.prisma.class.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    const c = await this.prisma.class.findUnique({ where: { id } });
    if (!c) throw new NotFoundException('Class not found');
    await this.prisma.class.delete({ where: { id } });
    return { ok: true };
  }

  async approve(id: number, staffId: number) {
    const c = await this.prisma.class.findUnique({ where: { id } });
    if (!c) throw new NotFoundException('Class not found');
    return this.prisma.class.update({
      where: { id },
      data: { status: ClassStatus.APPROVED, staffId },
    });
  }

  async close(id: number) {
    const c = await this.prisma.class.findUnique({ where: { id } });
    if (!c) throw new NotFoundException('Class not found');
    return this.prisma.class.update({
      where: { id },
      data: { status: ClassStatus.CLOSED },
    });
  }
}
