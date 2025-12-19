import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { ClassStatus, PaymentStatus } from '@prisma/client';

@Injectable()
export class ReportsService {
  constructor(private prisma: PrismaService) {}

  async dashboard() {
    const [users, parents, tutors, classesTotal, classesByStatus, paymentsByStatus, revenueConfirmed] =
      await Promise.all([
        this.prisma.user.count(),
        this.prisma.parent.count(),
        this.prisma.tutor.count(),
        this.prisma.class.count(),
        this.prisma.class.groupBy({ by: ['status'], _count: { status: true } }),
        this.prisma.payment.groupBy({ by: ['status'], _count: { status: true } }),
        this.prisma.payment.aggregate({ where: { status: PaymentStatus.CONFIRMED }, _sum: { amount: true } }),
      ]);

    const classesMap: Record<string, number> = {};
    for (const row of classesByStatus) classesMap[row.status] = row._count.status;

    const payMap: Record<string, number> = {};
    for (const row of paymentsByStatus) payMap[row.status] = row._count.status;

    return {
      users,
      parents,
      tutors,
      classesTotal,
      classesByStatus: classesMap,
      paymentsByStatus: payMap,
      revenueConfirmed: revenueConfirmed._sum.amount ?? 0,
    };
  }

  async classStatusSummary() {
    const rows = await this.prisma.class.groupBy({ by: ['status'], _count: { status: true } });
    const out: Record<ClassStatus, number> = {
      PENDING: 0, APPROVED: 0, CLOSED: 0, CANCELLED: 0,
    };
    for (const r of rows) out[r.status] = r._count.status;
    return out;
  }
}
