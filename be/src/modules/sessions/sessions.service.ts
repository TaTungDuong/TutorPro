import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';

@Injectable()
export class SessionsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateSessionDto) {
    const cls = await this.prisma.class.findUnique({ where: { id: dto.classId } });
    if (!cls) throw new NotFoundException('Class not found');

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

  list(classId?: number) {
    return this.prisma.session.findMany({
      where: classId ? { classId } : undefined,
      orderBy: { date: 'desc' },
    });
  }

  async get(id: number) {
    const s = await this.prisma.session.findUnique({
      where: { id },
      include: { complaints: true, class: true },
    });
    if (!s) throw new NotFoundException('Session not found');
    return s;
  }

  async update(id: number, dto: UpdateSessionDto) {
    const s = await this.prisma.session.findUnique({ where: { id } });
    if (!s) throw new NotFoundException('Session not found');
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

  async parentConfirm(id: number) {
    const s = await this.prisma.session.findUnique({ where: { id } });
    if (!s) throw new NotFoundException('Session not found');
    return this.prisma.session.update({ where: { id }, data: { parentConfirm: 1 } });
  }

  async remove(id: number) {
    const s = await this.prisma.session.findUnique({ where: { id } });
    if (!s) throw new NotFoundException('Session not found');
    await this.prisma.session.delete({ where: { id } });
    return { ok: true };
  }
}
