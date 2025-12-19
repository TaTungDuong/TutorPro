import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, Min } from 'class-validator';

export class CreateApplicationDto {
  @ApiProperty()
  @IsInt()
  classId!: number;

  @ApiProperty()
  @IsInt()
  tutorId!: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  matchScore!: number;
}
