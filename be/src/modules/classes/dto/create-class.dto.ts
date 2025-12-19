import { ApiProperty } from '@nestjs/swagger';
import { ClassStatus } from '@prisma/client';
import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateClassDto {
  @ApiProperty()
  @IsString()
  classID!: string;

  @ApiProperty()
  @IsString()
  subject!: string;

  @ApiProperty()
  @IsString()
  level!: string;

  @ApiProperty()
  @IsString()
  location!: string;

  @ApiProperty()
  @IsString()
  schedule!: string;

  @ApiProperty()
  @IsString()
  fee!: string;

  @ApiProperty({ enum: ClassStatus, required: false })
  @IsOptional()
  @IsEnum(ClassStatus)
  status?: ClassStatus;

  @ApiProperty()
  @IsInt()
  parentId!: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  staffId?: number;
}
