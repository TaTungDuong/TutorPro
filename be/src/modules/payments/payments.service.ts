import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { PaymentStatus } from '@prisma/client';

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreatePaymentDto) {
    const cls = await this.prisma.class.findUnique({ where: { id: dto.classId } });
    if (!cls) throw new NotFoundException('Class not found');
    const parent = await this.prisma.parent.findUnique({ where: { id: dto.payerId } });
    if (!parent) throw new NotFoundException('Parent not found');

    return this.prisma.payment.create({ data: dto });
  }

  list(filters: { status?: PaymentStatus; payerId?: number; classId?: number }) {
    return this.prisma.payment.findMany({
      where: filters,
      include: { class: true, parent: true },
      orderBy: { id: 'desc' },
    });
  }

  async confirm(id: number, confirmer: number) {
    const p = await this.prisma.payment.findUnique({ where: { id } });
    if (!p) throw new NotFoundException('Payment not found');

    return this.prisma.payment.update({
      where: { id },
      data: { status: PaymentStatus.CONFIRMED, confirmer, confirmTime: new Date() },
    });
  }

  async reject(id: number, confirmer: number) {
    const p = await this.prisma.payment.findUnique({ where: { id } });
    if (!p) throw new NotFoundException('Payment not found');

    return this.prisma.payment.update({
      where: { id },
      data: { status: PaymentStatus.REJECTED, confirmer, confirmTime: new Date() },
    });
  }
}
