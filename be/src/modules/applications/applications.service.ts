import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { ApplicationStatus } from '@prisma/client';

@Injectable()
export class ApplicationsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateApplicationDto) {
    try {
      return await this.prisma.application.create({ data: dto });
    } catch {
      throw new BadRequestException('Tutor already applied to this class');
    }
  }

  list(filters: { classId?: number; tutorId?: number; status?: ApplicationStatus }) {
    return this.prisma.application.findMany({
      where: filters,
      include: { tutor: { include: { user: true } }, class: true },
      orderBy: { id: 'desc' },
    });
  }

  async updateStatus(id: number, status: ApplicationStatus) {
    const a = await this.prisma.application.findUnique({ where: { id } });
    if (!a) throw new NotFoundException('Application not found');
    return this.prisma.application.update({ where: { id }, data: { status } });
  }

  async remove(id: number) {
    const a = await this.prisma.application.findUnique({ where: { id } });
    if (!a) throw new NotFoundException('Application not found');
    await this.prisma.application.delete({ where: { id } });
    return { ok: true };
  }
}
