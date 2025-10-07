import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from '../task.service';
import { CreateTaskDto } from '../dtos/create-task.dto';
import { UpdateTaskDto } from '../dtos/update-task.dto';
import { NotAcceptableException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { taskMock } from '../__mocks__/task.mock';

describe('TaskService', () => {
  let service: TaskService;
  let prisma: PrismaService;

  const mockPrisma = {
    task: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<TaskService>(TaskService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => jest.clearAllMocks());

  it('deve criar uma nova task com status padrão "pending"', async () => {
    const dto: CreateTaskDto = {
      title: 'Nova Task',
      description: 'Descrição teste',
      userId: 1,
    };

    mockPrisma.task.create.mockResolvedValue(taskMock);

    const result = await service.create(dto);

    expect(result).toEqual(taskMock);
    expect(prisma.task.create).toHaveBeenCalledWith({
      data: { ...dto, status: 'pending' },
    });
  });

  it('deve retornar todas as tasks', async () => {
    mockPrisma.task.findMany.mockResolvedValue([taskMock]);

    const result = await service.findAll();

    expect(result).toEqual([taskMock]);
    expect(prisma.task.findMany).toHaveBeenCalled();
  });

  it('deve retornar todas as tasks de um usuário', async () => {
    mockPrisma.task.findMany.mockResolvedValue([taskMock]);

    const result = await service.findAllTasksByUser(1);

    expect(result).toEqual([taskMock]);
    expect(prisma.task.findMany).toHaveBeenCalledWith({ where: { userId: 1 } });
  });

  it('deve retornar uma task por ID', async () => {
    mockPrisma.task.findUnique.mockResolvedValue(taskMock);

    const result = await service.findOne(1);

    expect(result).toEqual(taskMock);
    expect(prisma.task.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
      include: { user: true },
    });
  });

  it('deve lançar NotAcceptableException se task não for encontrada', async () => {
    mockPrisma.task.findUnique.mockResolvedValue(null);

    await expect(service.findOne(1)).rejects.toThrow(NotAcceptableException);
  });

  it('deve atualizar as informações de uma task', async () => {
    const dto: UpdateTaskDto = { 
      title: 'Nova Titulo da Task',
      description: 'Nova Descrição teste',
      userId: 2
    };
    const updatedTask = { ...taskMock };

    mockPrisma.task.update.mockResolvedValue(updatedTask);

    const result = await service.updateTask(1, dto);

    expect(result).toEqual(updatedTask);
    expect(prisma.task.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { ...dto },
    });
  });

  it('deve deletar uma task', async () => {
    mockPrisma.task.delete.mockResolvedValue(taskMock);

    const result = await service.delete(1);

    expect(result).toEqual(taskMock);
    expect(prisma.task.delete).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it('deve lançar erro se tentar deletar uma task inexistente', async () => {
    const prismaError = { code: 'P2025' };
    mockPrisma.task.delete.mockRejectedValue(prismaError);

    await expect(service.delete(99)).rejects.toThrow('Task não encontrada');
  });
});
