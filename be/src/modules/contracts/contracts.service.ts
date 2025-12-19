import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateContractDto } from './dto/create-contract.dto';

@Injectable()
export class ContractsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateContractDto) {
    const cls = await this.prisma.class.findUnique({ where: { id: dto.classId } });
    if (!cls) throw new NotFoundException('Class not found');

    try {
      return await this.prisma.contract.create({ data: dto });
    } catch {
      throw new BadRequestException('Contract already exists for this class');
    }
  }

  getByClassId(classId: number) {
    return this.prisma.contract.findUnique({ where: { classId } });
  }

  async remove(id: number) {
    const c = await this.prisma.contract.findUnique({ where: { id } });
    if (!c) throw new NotFoundException('Contract not found');
    await this.prisma.contract.delete({ where: { id } });
    return { ok: true };
  }
}
