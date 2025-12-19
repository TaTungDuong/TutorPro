import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { ConfirmPaymentDto } from './dto/confirm-payment.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '@/common/decorators/roles.decorator';
import { RolesGuard } from '@/common/guards/roles.guard';
import { PaymentStatus, UserRole } from '@prisma/client';

@ApiTags('payments')
@ApiBearerAuth()
@Controller('payments')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PaymentsController {
  constructor(private payments: PaymentsService) {}

  @Post()
  @Roles(UserRole.PARENT, UserRole.ADMIN, UserRole.STAFF)
  create(@Body() dto: CreatePaymentDto) {
    return this.payments.create(dto);
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  list(@Query('status') status?: PaymentStatus, @Query('payerId') payerId?: string, @Query('classId') classId?: string) {
    return this.payments.list({
      status,
      payerId: payerId ? Number(payerId) : undefined,
      classId: classId ? Number(classId) : undefined,
    });
  }

  @Post(':id/confirm')
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  confirm(@Param('id') id: string, @Body() dto: ConfirmPaymentDto) {
    return this.payments.confirm(Number(id), dto.confirmer);
  }

  @Post(':id/reject')
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  reject(@Param('id') id: string, @Body() dto: ConfirmPaymentDto) {
    return this.payments.reject(Number(id), dto.confirmer);
  }
}
