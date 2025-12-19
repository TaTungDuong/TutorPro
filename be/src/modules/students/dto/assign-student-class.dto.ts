import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class AssignStudentClassDto {
  @ApiProperty()
  @IsInt()
  studentId!: number;

  @ApiProperty()
  @IsInt()
  classId!: number;
}
