import { PrismaService } from '../prisma/prisma.service';
import { Injectable, NotAcceptableException } from '@nestjs/common';
import { CreateTaskDto } from './dtos/create-task.dto';
import { Task, TaskStatus } from './types/task.type';
import { UpdateTaskDto } from './dtos/update-task.dto';

@Injectable()
export class TaskService {
  constructor(
    private readonly prisma: PrismaService
  ) {}

  async create(
    createTask: CreateTaskDto
  ): Promise<Task> {
    const defaultStatus: TaskStatus = 'pending';

    return this.prisma.task.create({ 
      data: {
        ...createTask,
        status: defaultStatus
      } 
    });
  };

  async findAll(): Promise<Task[]> {
    return this.prisma.task.findMany();
  };

  async findAllTasksByUser(userId: number): Promise<Task[]> {
    return this.prisma.task.findMany({
      where: { userId }
    });
  };

  async findOne(id: number): Promise<Task> {
    const task = await this.prisma.task.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!task) throw new NotAcceptableException('Task not found');

    return task;
  };

  async updateTask(
    id: number,
    updateTaskStatus: UpdateTaskDto
  ): Promise<Task> {
    return this.prisma.task.update({
      where: { id },
      data: { ...updateTaskStatus },
    });
  };

  async toggleTaskStatus(id: number): Promise<Task> {
    const task = await this.findOne(id);
    const newStatus = task.status === 'pending' ? 'done' : 'pending';

    return this.prisma.task.update({
      where: { id },
      data: { status: newStatus },
    });
  };

  async delete(id: number): Promise<Task> {
    try {
      const deletedTask = await this.prisma.task.delete(
        { where: { id } }
      );
      
      return deletedTask;
    } catch (err) {
      if (err.code === 'P2025') {
        throw new Error('Task não encontrada');
      } throw err;
    };
  };
};
