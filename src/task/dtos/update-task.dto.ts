import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskDto {
  @ApiProperty({ example: 'Tarefa 1', description: 'Título da tarefa.' })
  @IsString()
  @IsOptional()
  title: string;

  @ApiProperty({ example: 'Descrição', description: 'Descrição detalhada da tarefa.' })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({ example: '2', description: 'ID do usuário vinculado à tarefa.' })
  @IsNumber()
  @IsOptional()
  userId: number;
}