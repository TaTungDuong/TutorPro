import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsNumber, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateTutorDto {
  @ApiProperty()
  @IsEmail()
  email!: string;

  @ApiProperty({ minLength: 6 })
  @IsString()
  @MinLength(6)
  password!: string;

  @ApiProperty()
  @IsString()
  specialization!: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  availableTime?: string;

  @ApiProperty()
  @IsNumber()
  feeProposal!: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  feedback?: string;
}
