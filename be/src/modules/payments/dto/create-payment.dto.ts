import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsString, Min } from 'class-validator';

export class CreatePaymentDto {
  @ApiProperty()
  @IsInt()
  payerId!: number;

  @ApiProperty()
  @IsString()
  img!: string;

  @ApiProperty()
  @IsInt()
  classId!: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  amount!: number;
}
