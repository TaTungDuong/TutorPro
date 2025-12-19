import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateParentDto } from './dto/create-parent.dto';
import { UpdateParentDto } from './dto/update-parent.dto';
import * as bcrypt from 'bcryptjs';
import { UserRole } from '@prisma/client';

@Injectable()
export class ParentsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateParentDto) {
    const exists = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (exists) throw new BadRequestException('Email already exists');

    const password = await bcrypt.hash(dto.password, 10);

    return this.prisma.parent.create({
      data: {
        user: { create: { email: dto.email, password, role: UserRole.PARENT } },
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

  async get(id: number) {
    const p = await this.prisma.parent.findUnique({
      where: { id },
      include: { user: { select: { id: true, email: true, role: true, status: true } } },
    });
    if (!p) throw new NotFoundException('Parent not found');
    return p;
  }

  async update(id: number, dto: UpdateParentDto) {
    const p = await this.prisma.parent.findUnique({ where: { id }, include: { user: true } });
    if (!p) throw new NotFoundException('Parent not found');

    const userData: any = {};
    if (dto.email) userData.email = dto.email;
    if (dto.password) userData.password = await bcrypt.hash(dto.password, 10);

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

  async remove(id: number) {
    const p = await this.prisma.parent.findUnique({ where: { id } });
    if (!p) throw new NotFoundException('Parent not found');
    await this.prisma.parent.delete({ where: { id } });
    return { ok: true };
  }
}
