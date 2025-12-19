import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { AssignStudentClassDto } from './dto/assign-student-class.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '@/common/guards/roles.guard';
import { Roles } from '@/common/decorators/roles.decorator';
import { UserRole } from '@prisma/client';

@ApiTags('students')
@ApiBearerAuth()
@Controller('students')
@UseGuards(JwtAuthGuard, RolesGuard)
export class StudentsController {
  constructor(private students: StudentsService) {}

  @Post()
  @Roles(UserRole.ADMIN, UserRole.STAFF, UserRole.PARENT)
  create(@Body() dto: CreateStudentDto) {
    return this.students.create(dto);
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.STAFF, UserRole.PARENT)
  list(@Query('parentId') parentId?: string) {
    return this.students.list(parentId ? Number(parentId) : undefined);
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.STAFF, UserRole.PARENT)
  get(@Param('id') id: string) {
    return this.students.get(Number(id));
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN, UserRole.STAFF, UserRole.PARENT)
  update(@Param('id') id: string, @Body() dto: UpdateStudentDto) {
    return this.students.update(Number(id), dto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN, UserRole.STAFF, UserRole.PARENT)
  remove(@Param('id') id: string) {
    return this.students.remove(Number(id));
  }

  @Post('assign')
  @Roles(UserRole.ADMIN, UserRole.STAFF, UserRole.PARENT)
  assign(@Body() dto: AssignStudentClassDto) {
    return this.students.assignToClass(dto);
  }

  @Delete(':studentId/classes/:classId')
  @Roles(UserRole.ADMIN, UserRole.STAFF, UserRole.PARENT)
  unassign(@Param('studentId') studentId: string, @Param('classId') classId: string) {
    return this.students.unassign(Number(studentId), Number(classId));
  }
}
