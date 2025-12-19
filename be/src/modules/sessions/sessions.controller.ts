import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SessionsService } from './sessions.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '@/common/guards/roles.guard';
import { Roles } from '@/common/decorators/roles.decorator';
import { UserRole } from '@prisma/client';

@ApiTags('sessions')
@ApiBearerAuth()
@Controller('sessions')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SessionsController {
  constructor(private sessions: SessionsService) {}

  @Post()
  @Roles(UserRole.TUTOR, UserRole.ADMIN, UserRole.STAFF)
  create(@Body() dto: CreateSessionDto) {
    return this.sessions.create(dto);
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.STAFF, UserRole.PARENT, UserRole.TUTOR)
  list(@Query('classId') classId?: string) {
    return this.sessions.list(classId ? Number(classId) : undefined);
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.STAFF, UserRole.PARENT, UserRole.TUTOR)
  get(@Param('id') id: string) {
    return this.sessions.get(Number(id));
  }

  @Patch(':id')
  @Roles(UserRole.TUTOR, UserRole.ADMIN, UserRole.STAFF)
  update(@Param('id') id: string, @Body() dto: UpdateSessionDto) {
    return this.sessions.update(Number(id), dto);
  }

  @Post(':id/parent-confirm')
  @Roles(UserRole.PARENT, UserRole.ADMIN, UserRole.STAFF)
  confirm(@Param('id') id: string) {
    return this.sessions.parentConfirm(Number(id));
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  remove(@Param('id') id: string) {
    return this.sessions.remove(Number(id));
  }
}
