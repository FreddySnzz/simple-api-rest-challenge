import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { BadRequestException, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { userMock, userWithTasksMock } from '../__mocks__/user.mock';

describe('UserService', () => {
  let service: UserService;
  let prisma: PrismaService;

  const mockPrisma = {
    user: {
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
        UserService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => jest.clearAllMocks());

  it('deve criar um usuário', async () => {
    const dto: CreateUserDto = {
      name: 'John',
      email: 'john@example.com'
    };

    mockPrisma.user.create.mockResolvedValue(userMock);

    const result = await service.create(dto);

    expect(result).toEqual(userMock);
    expect(prisma.user.create).toHaveBeenCalledWith({ data: dto });
  });

  it('deve retornar todos os usuários com tasks', async () => {
    mockPrisma.user.findMany.mockResolvedValue([userWithTasksMock]);

    const result = await service.findAll();

    expect(result).toEqual([userWithTasksMock]);
    expect(prisma.user.findMany).toHaveBeenCalledWith({
      include: { tasks: true },
    });
  });

  it('deve retornar um usuário pelo ID', async () => {
    mockPrisma.user.findUnique.mockResolvedValue(userWithTasksMock);

    const result = await service.findOne(1);

    expect(result).toEqual(userWithTasksMock);
    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
      include: { tasks: true },
    });
  });

  it('deve lançar BadRequestException se ocorrer erro inesperado', async () => {
    mockPrisma.user.findUnique.mockRejectedValue(new Error('DB error'));

    await expect(service.findOne(1)).rejects.toThrow(BadRequestException);
  });

  it('deve atualizar um usuário', async () => {
    const dto: UpdateUserDto = {
      name: 'Jane',
      email: 'jane@example.com'
    };

    const updatedUser = { ...userWithTasksMock, ...dto };

    mockPrisma.user.update.mockResolvedValue(updatedUser);

    const result = await service.updateUser(1, dto);

    expect(result).toEqual(updatedUser);
    expect(prisma.user.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { ...dto },
    });
  });

  it('deve deletar um usuário', async () => {
    mockPrisma.user.delete.mockResolvedValue(userMock);

    const result = await service.delete(1);

    expect(result).toEqual(userMock);
    expect(prisma.user.delete).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it('deve lançar erro se tentar deletar usuário inexistente', async () => {
    const prismaError = { code: 'P2025' };
    mockPrisma.user.delete.mockRejectedValue(prismaError);

    await expect(service.delete(99)).rejects.toThrow('Usuário não encontrado');
  });
});
