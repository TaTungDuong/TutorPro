import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateStaffDto {
  @ApiProperty()
  @IsEmail()
  email!: string;

  @ApiProperty({ minLength: 6 })
  @IsString()
  @MinLength(6)
  password!: string;

  @ApiProperty()
  @IsString()
  department!: string;

  @ApiProperty()
  @IsString()
  position!: string;

  @ApiProperty({ example: 'ACTIVE' })
  @IsString()
  status!: string;
}
