import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsNumber, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateTutorDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ minLength: 6 })
  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  specialization?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  availableTime?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  feeProposal?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  feedback?: string;
}
