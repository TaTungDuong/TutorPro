import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationStatusDto } from './dto/update-application-status.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '@/common/guards/roles.guard';
import { Roles } from '@/common/decorators/roles.decorator';
import { ApplicationStatus, UserRole } from '@prisma/client';

@ApiTags('applications')
@ApiBearerAuth()
@Controller('applications')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ApplicationsController {
  constructor(private apps: ApplicationsService) {}

  @Post()
  @Roles(UserRole.TUTOR, UserRole.ADMIN)
  create(@Body() dto: CreateApplicationDto) {
    return this.apps.create(dto);
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.STAFF, UserRole.TUTOR, UserRole.PARENT)
  list(
    @Query('classId') classId?: string,
    @Query('tutorId') tutorId?: string,
    @Query('status') status?: ApplicationStatus,
  ) {
    return this.apps.list({
      classId: classId ? Number(classId) : undefined,
      tutorId: tutorId ? Number(tutorId) : undefined,
      status,
    });
  }

  @Patch(':id/status')
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  updateStatus(@Param('id') id: string, @Body() dto: UpdateApplicationStatusDto) {
    return this.apps.updateStatus(Number(id), dto.status);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  remove(@Param('id') id: string) {
    return this.apps.remove(Number(id));
  }
}
