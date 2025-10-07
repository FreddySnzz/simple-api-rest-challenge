import { 
  Body, 
  Controller, 
  Delete, 
  Get, 
  Param, 
  Patch, 
  Post, 
  Put,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { 
  ApiBody, 
  ApiOperation, 
  ApiTags 
} from '@nestjs/swagger';
import { ApiStandardResponses } from '../decorators/api-responses.decorator';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dtos/create-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { Task } from './types/task.type';
import { ReturnTaskStatusDto } from './dtos/return-task-status.dto';

@ApiTags('Tasks')
@Controller('tasks')
export class TaskController {
  constructor(
    private readonly taskService: TaskService
  ) {}

  @Post()
  @UsePipes(ValidationPipe)
  @ApiOperation({ summary: 'Cria uma nova tarefa' })
  @ApiBody({ type: CreateTaskDto })
  @ApiStandardResponses()
  async create(
    @Body() createTask: CreateTaskDto
  ): Promise<Task> {
    return this.taskService.create(createTask);
  };

  @ApiOperation({ summary: 'Retorna uma lista de tarefa' })
  @ApiStandardResponses()
  @Get()
  async findAll(): Promise<Task[]> {
    return this.taskService.findAll();
  };

  @ApiOperation({ summary: 'Retorna uma lista de tarefa vinculadas à um usuário' })
  @ApiStandardResponses()
  @Get(':id/all')
  async findAllTasksByUser(
    @Param('id') id: number
  ): Promise<Task[]> {
    return this.taskService.findAllTasksByUser(id);
  };

  @ApiOperation({ summary: 'Busca uma tarefa por ID' })
  @ApiStandardResponses()
  @Get(':id')
  async findOne(
    @Param('id') id: number
  ): Promise<Task> {
    return this.taskService.findOne(id);
  };

  @Put(':id')
  @UsePipes(ValidationPipe)
  @ApiOperation({ summary: 'Atualiza informações de uma tarefa' })
  @ApiBody({ type: UpdateTaskDto })
  @ApiStandardResponses()
  async updateTask(
    @Param('id') id: number, 
    @Body() updateTask: UpdateTaskDto
  ): Promise<Task> {
    return this.taskService.updateStatus(id, updateTask);
  };

  @Patch(':id/status')
  @ApiOperation({ summary: 'Atualiza o status de uma tarefa' })
  @ApiStandardResponses()
  async toggleStatus(
    @Param('id') id: number
  ): Promise<ReturnTaskStatusDto> {
    const task = await this.taskService.toggleTaskStatus(id);
    return new ReturnTaskStatusDto(task.status);
  };

  @Delete(':id')
  @ApiOperation({ summary: 'Deleta uma tarefa' })
  @ApiStandardResponses()
  async delete(
    @Param('id') id: number
  ): Promise<Task> {
    return this.taskService.delete(id);
  };
};
