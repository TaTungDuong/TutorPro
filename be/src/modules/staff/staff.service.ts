import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { UserRole } from '@prisma/client';

@Injectable()
export class StaffService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateStaffDto) {
    const exists = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (exists) throw new BadRequestException('Email already exists');

    const password = await bcrypt.hash(dto.password, 10);
    return this.prisma.staff.create({
      data: {
        user: { create: { email: dto.email, password, role: UserRole.STAFF } },
        department: dto.department,
        position: dto.position,
        status: dto.status,
      },
      include: { user: { select: { id: true, email: true, role: true, status: true } } },
    });
  }

  list() {
    return this.prisma.staff.findMany({
      include: { user: { select: { id: true, email: true, role: true, status: true } } },
      orderBy: { id: 'asc' },
    });
  }

  async get(id: number) {
    const s = await this.prisma.staff.findUnique({
      where: { id },
      include: { user: { select: { id: true, email: true, role: true, status: true } } },
    });
    if (!s) throw new NotFoundException('Staff not found');
    return s;
  }

  async update(id: number, dto: UpdateStaffDto) {
    const s = await this.prisma.staff.findUnique({ where: { id }, include: { user: true } });
    if (!s) throw new NotFoundException('Staff not found');

    const userData: any = {};
    if (dto.email) userData.email = dto.email;
    if (dto.password) userData.password = await bcrypt.hash(dto.password, 10);

    return this.prisma.staff.update({
      where: { id },
      data: {
        department: dto.department,
        position: dto.position,
        status: dto.status,
        user: Object.keys(userData).length ? { update: userData } : undefined,
      },
      include: { user: { select: { id: true, email: true, role: true, status: true } } },
    });
  }

  async remove(id: number) {
    const s = await this.prisma.staff.findUnique({ where: { id } });
    if (!s) throw new NotFoundException('Staff not found');
    await this.prisma.staff.delete({ where: { id } });
    return { ok: true };
  }
}
