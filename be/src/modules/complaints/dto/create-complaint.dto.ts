import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class CreateComplaintDto {
  @ApiProperty()
  @IsInt()
  sessionId!: number;

  @ApiProperty()
  @IsString()
  type!: string;

  @ApiProperty()
  @IsString()
  description!: string;
}
