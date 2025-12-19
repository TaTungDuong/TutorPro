import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { CreateTutorDto } from './dto/create-tutor.dto';
import { UpdateTutorDto } from './dto/update-tutor.dto';
import { UserRole } from '@prisma/client';

@Injectable()
export class TutorsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateTutorDto) {
    const exists = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (exists) throw new BadRequestException('Email already exists');

    const password = await bcrypt.hash(dto.password, 10);

    return this.prisma.tutor.create({
      data: {
        user: { create: { email: dto.email, password, role: UserRole.TUTOR } },
        specialization: dto.specialization,
        availableTime: dto.availableTime ? new Date(dto.availableTime) : undefined,
        feeProposal: dto.feeProposal,
        feedback: dto.feedback,
      },
      include: { user: { select: { id: true, email: true, role: true, status: true } } },
    });
  }

  list() {
    return this.prisma.tutor.findMany({
      include: { user: { select: { id: true, email: true, role: true, status: true } } },
      orderBy: { id: 'asc' },
    });
  }

  async get(id: number) {
    const t = await this.prisma.tutor.findUnique({
      where: { id },
      include: { user: { select: { id: true, email: true, role: true, status: true } } },
    });
    if (!t) throw new NotFoundException('Tutor not found');
    return t;
  }

  async update(id: number, dto: UpdateTutorDto) {
    const t = await this.prisma.tutor.findUnique({ where: { id }, include: { user: true } });
    if (!t) throw new NotFoundException('Tutor not found');

    const userData: any = {};
    if (dto.email) userData.email = dto.email;
    if (dto.password) userData.password = await bcrypt.hash(dto.password, 10);

    return this.prisma.tutor.update({
      where: { id },
      data: {
        specialization: dto.specialization,
        availableTime: dto.availableTime ? new Date(dto.availableTime) : undefined,
        feeProposal: dto.feeProposal,
        feedback: dto.feedback,
        user: Object.keys(userData).length ? { update: userData } : undefined,
      },
      include: { user: { select: { id: true, email: true, role: true, status: true } } },
    });
  }

  async remove(id: number) {
    const t = await this.prisma.tutor.findUnique({ where: { id } });
    if (!t) throw new NotFoundException('Tutor not found');
    await this.prisma.tutor.delete({ where: { id } });
    return { ok: true };
  }

  async getByUserId(userId: number) {
    return this.prisma.tutor.findUnique({ where: { userId } });
  }
}
