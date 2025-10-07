import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskDto {
  @ApiProperty({ example: 'Tarefa 1', description: 'Título da tarefa.' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'Descrição', description: 'Descrição detalhada da tarefa.' })
  @IsString()
  @IsOptional()
  description: string;
}