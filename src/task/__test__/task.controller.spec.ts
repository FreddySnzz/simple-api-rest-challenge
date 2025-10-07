import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from '../task.controller';
import { TaskService } from '../task.service';
import { ReturnTaskStatusDto } from '../dtos/return-task-status.dto';
import { CreateTaskDto } from '../dtos/create-task.dto';
import { UpdateTaskDto } from '../dtos/update-task.dto';
import { taskMock } from '../__mocks__/task.mock';

describe('TaskController', () => {
  let controller: TaskController;
  let service: TaskService;

  const mockTaskService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findAllTasksByUser: jest.fn(),
    findOne: jest.fn(),
    updateStatus: jest.fn(),
    toggleTaskStatus: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [
        {
          provide: TaskService,
          useValue: mockTaskService,
        },
      ],
    }).compile();

    controller = module.get<TaskController>(TaskController);
    service = module.get<TaskService>(TaskService);
  });

  afterEach(() => jest.clearAllMocks());

  it('deve criar uma nova tarefa', async () => {
    const dto: CreateTaskDto = {
      title: 'Nova Task',
      description: 'Descrição da Task',
      userId: 1,
    };

    mockTaskService.create.mockResolvedValue(taskMock);

    const result = await controller.create(dto);

    expect(result).toEqual(taskMock);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('deve retornar todas as tarefas', async () => {
    mockTaskService.findAll.mockResolvedValue([taskMock]);

    const result = await controller.findAll();

    expect(result).toEqual([taskMock]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('deve retornar todas as tarefas de um usuário', async () => {
    const userId = 1;
    mockTaskService.findAllTasksByUser.mockResolvedValue([taskMock]);

    const result = await controller.findAllTasksByUser(userId);

    expect(result).toEqual([taskMock]);
    expect(service.findAllTasksByUser).toHaveBeenCalledWith(userId);
  });

  it('deve retornar uma tarefa pelo ID', async () => {
    const taskId = 1;
    mockTaskService.findOne.mockResolvedValue(taskMock);

    const result = await controller.findOne(taskId);

    expect(result).toEqual(taskMock);
    expect(service.findOne).toHaveBeenCalledWith(taskId);
  });

  it('deve alternar o status da tarefa e retornar apenas o status', async () => {
    const taskId = 1;
    const toggledTask = { ...taskMock, status: 'done' };
    mockTaskService.toggleTaskStatus.mockResolvedValue(toggledTask);

    const result = await controller.toggleStatus(taskId);

    expect(result).toBeInstanceOf(ReturnTaskStatusDto);
    expect(result.status).toBe('done');
    expect(service.toggleTaskStatus).toHaveBeenCalledWith(taskId);
  });

  it('deve deletar uma tarefa', async () => {
    const taskId = 1;
    mockTaskService.delete.mockResolvedValue(taskMock);

    const result = await controller.delete(taskId);

    expect(result).toEqual(taskMock);
    expect(service.delete).toHaveBeenCalledWith(taskId);
  });
});
