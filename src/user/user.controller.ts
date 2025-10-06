import { 
  Body, 
  Controller, 
  Delete, 
  Get, 
  Param, 
  Post, 
  UsePipes, 
  ValidationPipe 
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {}

  @UsePipes(ValidationPipe)
  @Post()
  async create(
    @Body() createUser: CreateUserDto
  ): Promise<any> {
    return this.userService.create(createUser);
  };

  @Get()
  async findAll(): Promise<any> {
    return this.userService.findAll();
  };

  @Get('/:id')
  async findOne(
    @Param('id') id: string
  ): Promise<any> {
    return this.userService.findOne(+id);
  };

  @Delete('/:id')
  async delete(
    @Param('id') id: string
  ): Promise<any> {
    return this.userService.delete(+id);
  };
};
