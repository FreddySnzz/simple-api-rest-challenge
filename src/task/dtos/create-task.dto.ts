import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ example: 'Task 1', description: 'Título da tarefa.' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'Task Description', description: 'Descrição detalhada da tarefa.' })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({ example: '1', description: 'ID do usuário vinculado à tarefa.' })
  @IsNumber()
  userId: number;
};