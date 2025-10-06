import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService
  ) {}

  async create(
    createUser: CreateUserDto
  ): Promise<any> {
    return this.prisma.user.create({ createUser });
  };

  async findAll(): Promise<any[]> {
    return this.prisma.user.findMany({
      include: { tasks: true },
    });
  };

  async findOne(id: number): Promise<any> {
    return this.prisma.user.findUnique({
      where: { id },
      include: { tasks: true },
    });
  };

  async delete(id: number): Promise<any> {
    return this.prisma.user.delete({ where: { id } });
  };
};