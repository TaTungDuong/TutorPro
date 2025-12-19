import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateComplaintDto } from './dto/create-complaint.dto';
import { UpdateComplaintDto } from './dto/update-complaint.dto';

@Injectable()
export class ComplaintsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateComplaintDto) {
    const session = await this.prisma.session.findUnique({ where: { id: dto.sessionId } });
    if (!session) throw new NotFoundException('Session not found');
    return this.prisma.complaint.create({ data: dto });
  }

  list(sessionId?: number) {
    return this.prisma.complaint.findMany({
      where: sessionId ? { sessionId } : undefined,
      include: { session: true },
      orderBy: { id: 'desc' },
    });
  }

  async get(id: number) {
    const c = await this.prisma.complaint.findUnique({ where: { id }, include: { session: true } });
    if (!c) throw new NotFoundException('Complaint not found');
    return c;
  }

  async update(id: number, dto: UpdateComplaintDto) {
    const c = await this.prisma.complaint.findUnique({ where: { id } });
    if (!c) throw new NotFoundException('Complaint not found');
    return this.prisma.complaint.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    const c = await this.prisma.complaint.findUnique({ where: { id } });
    if (!c) throw new NotFoundException('Complaint not found');
    await this.prisma.complaint.delete({ where: { id } });
    return { ok: true };
  }
}
