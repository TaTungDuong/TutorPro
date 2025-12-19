import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class LogsService {
  constructor(private prisma: PrismaService) {}

  create(userId: number, action: string, target: string, ipAddress?: string) {
    return this.prisma.log.create({
      data: { userId, action, target, ipAddress },
    });
  }

  list(params: { userId?: number; take?: number; skip?: number }) {
    const { userId, take = 50, skip = 0 } = params;
    return this.prisma.log.findMany({
      where: userId ? { userId } : undefined,
      orderBy: { timestamp: 'desc' },
      take,
      skip,
    });
  }
}
