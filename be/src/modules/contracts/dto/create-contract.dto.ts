import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsString } from 'class-validator';

export class CreateContractDto {
  @ApiProperty()
  @IsInt()
  classId!: number;

  @ApiProperty()
  @IsNumber()
  feeFirstMonth!: number;

  @ApiProperty()
  @IsString()
  centerRate!: string;

  @ApiProperty()
  @IsString()
  changeConditions!: string;

  @ApiProperty()
  @IsString()
  rules!: string;
}
