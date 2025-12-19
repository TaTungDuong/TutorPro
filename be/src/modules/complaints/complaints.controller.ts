import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ComplaintsService } from './complaints.service';
import { CreateComplaintDto } from './dto/create-complaint.dto';
import { UpdateComplaintDto } from './dto/update-complaint.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '@/common/guards/roles.guard';
import { Roles } from '@/common/decorators/roles.decorator';
import { UserRole } from '@prisma/client';

@ApiTags('complaints')
@ApiBearerAuth()
@Controller('complaints')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ComplaintsController {
  constructor(private complaints: ComplaintsService) {}

  @Post()
  @Roles(UserRole.PARENT, UserRole.ADMIN, UserRole.STAFF)
  create(@Body() dto: CreateComplaintDto) {
    return this.complaints.create(dto);
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  list(@Query('sessionId') sessionId?: string) {
    return this.complaints.list(sessionId ? Number(sessionId) : undefined);
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  get(@Param('id') id: string) {
    return this.complaints.get(Number(id));
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  update(@Param('id') id: string, @Body() dto: UpdateComplaintDto) {
    return this.complaints.update(Number(id), dto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  remove(@Param('id') id: string) {
    return this.complaints.remove(Number(id));
  }
}
