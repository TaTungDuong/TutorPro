import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Min } from 'class-validator';

export class CreateStudentDto {
  @ApiProperty()
  @IsInt()
  parentId!: number;

  @ApiProperty()
  @IsString()
  gender!: string;

  @ApiProperty()
  @IsInt()
  @Min(0)
  age!: number;

  @ApiProperty()
  @IsString()
  freeTime!: string;

  @ApiProperty()
  @IsString()
  target!: string;

  @ApiProperty()
  @IsInt()
  @Min(0)
  sessionPerWeek!: number;

  @ApiProperty()
  @IsString()
  description!: string;

  @ApiProperty()
  @IsString()
  fullName!: string;

  @ApiProperty()
  @IsString()
  requirementTutor!: string;
}
