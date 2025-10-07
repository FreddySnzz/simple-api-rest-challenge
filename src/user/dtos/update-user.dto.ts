import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ example: 'John Doe', description: 'Nome completo do usuário' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'johndoe@mail.com', description: 'Email do usuário' })
  @IsString()
  email: string;
}