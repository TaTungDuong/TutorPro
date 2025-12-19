import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ClassesService } from './classes.service';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '@/common/guards/roles.guard';
import { Roles } from '@/common/decorators/roles.decorator';
import { ClassStatus, UserRole } from '@prisma/client';

@ApiTags('classes')
@ApiBearerAuth()
@Controller('classes')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ClassesController {
  constructor(private classes: ClassesService) {}

  @Post()
  @Roles(UserRole.PARENT, UserRole.ADMIN, UserRole.STAFF)
  create(@Body() dto: CreateClassDto) {
    return this.classes.create(dto);
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.STAFF, UserRole.PARENT, UserRole.TUTOR)
  list(@Query('status') status?: ClassStatus, @Query('parentId') parentId?: string, @Query('staffId') staffId?: string) {
    return this.classes.list({
      status,
      parentId: parentId ? Number(parentId) : undefined,
      staffId: staffId ? Number(staffId) : undefined,
    });
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.STAFF, UserRole.PARENT, UserRole.TUTOR)
  get(@Param('id') id: string) {
    return this.classes.get(Number(id));
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  update(@Param('id') id: string, @Body() dto: UpdateClassDto) {
    return this.classes.update(Number(id), dto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  remove(@Param('id') id: string) {
    return this.classes.remove(Number(id));
  }

  @Post(':id/approve')
  @Roles(UserRole.STAFF, UserRole.ADMIN)
  approve(@Param('id') id: string, @Query('staffId') staffId: string) {
    return this.classes.approve(Number(id), Number(staffId));
  }

  @Post(':id/close')
  @Roles(UserRole.STAFF, UserRole.ADMIN)
  close(@Param('id') id: string) {
    return this.classes.close(Number(id));
  }
}
