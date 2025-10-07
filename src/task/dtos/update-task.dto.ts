import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskDto {
  @ApiProperty({ example: 'Task 1', description: 'Título da task.' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'Task Description', description: 'Descrição detalhada da task.' })
  @IsString()
  @IsOptional()
  description: string;
}