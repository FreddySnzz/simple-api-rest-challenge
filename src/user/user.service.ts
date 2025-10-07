import { PrismaService } from '../prisma/prisma.service';
import { BadRequestException, Injectable, NotAcceptableException } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User, UserWithTasks } from './types/user.type';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService
  ) {}

  async create(
    createUser: CreateUserDto
  ): Promise<User> {
    return this.prisma.user.create({
      data: createUser
    });
  };

  async findAll(): Promise<UserWithTasks[]> {
    return this.prisma.user.findMany({
      include: { tasks: true },
    });
  };

  async findOne(id: number): Promise<UserWithTasks> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
        include: { tasks: true },
      });
  
      if (!user) throw new NotAcceptableException('User not found');
  
      return user;
    } catch(error) {
      throw new BadRequestException(error);
    };
  };

  async updateUser(
    id: number,
    updateUser: UpdateUserDto
  ): Promise<UserWithTasks> {
    return this.prisma.user.update({
      where: { id },
      data: { ...updateUser },
    });
  };

  async delete(id: number): Promise<User> {
    try {
      const deletedUser = await this.prisma.user.delete(
        { where: { id } }
      );

      return deletedUser;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new Error('Usuário não encontrado');
      } throw new BadRequestException(error);
    };
  };
};