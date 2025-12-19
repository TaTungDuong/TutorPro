import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsString, Min } from 'class-validator';

export class CreateSessionDto {
  @ApiProperty()
  @IsInt()
  classId!: number;

  @ApiProperty()
  @IsDateString()
  date!: string;

  @ApiProperty()
  @IsString()
  content!: string;

  @ApiProperty()
  @IsInt()
  @Min(0)
  attendance!: number;

  @ApiProperty({ description: '0/1 for parent confirmation' })
  @IsInt()
  parentConfirm!: number;
}
