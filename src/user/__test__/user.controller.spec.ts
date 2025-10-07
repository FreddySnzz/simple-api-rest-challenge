import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { ReturnUserDto } from '../dtos/return-user.dto';
import { userMock, userWithTasksMock } from '../__mocks__/user.mock';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  const mockUserService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    updateUser: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  afterEach(() => jest.clearAllMocks());

  it('deve criar um novo usuário', async () => {
    const dto: CreateUserDto = {
      name: 'John Doe',
      email: 'john@example.com'
    };

    mockUserService.create.mockResolvedValue(userMock);

    const result = await controller.create(dto);

    expect(result).toEqual(userMock);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('deve retornar todos os usuários', async () => {
    mockUserService.findAll.mockResolvedValue([userWithTasksMock]);

    const result = await controller.findAll();

    expect(result).toEqual(
      [new ReturnUserDto(userWithTasksMock)]
    );
    expect(service.findAll).toHaveBeenCalled();
  });

  it('deve retornar um usuário por ID', async () => {
    const userId = 1;
    mockUserService.findOne.mockResolvedValue(userWithTasksMock);

    const result = await controller.findOne(userId);

    expect(result).toEqual(new ReturnUserDto(userWithTasksMock));
    expect(service.findOne).toHaveBeenCalledWith(userId);
  });

  it('deve atualizar um usuário e retornar o DTO', async () => {
    const userId = 1;
    const dto: UpdateUserDto = {
      name: 'Jane Doe',
      email: 'jane@example.com'
    };

    const updatedUser = { ...userWithTasksMock, ...dto };
    mockUserService.updateUser.mockResolvedValue(updatedUser);

    const result = await controller.update(userId, dto);

    expect(result).toEqual(new ReturnUserDto(updatedUser));
    expect(service.updateUser).toHaveBeenCalledWith(userId, dto);
  });

  it('deve deletar um usuário', async () => {
    const userId = 1;
    mockUserService.delete.mockResolvedValue(userMock);

    const result = await controller.delete(userId);

    expect(result).toEqual(userMock);
    expect(service.delete).toHaveBeenCalledWith(userId);
  });
});
