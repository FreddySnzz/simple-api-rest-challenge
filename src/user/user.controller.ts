import { 
  Body, 
  Controller, 
  Delete, 
  Get, 
  Param, 
  Post, 
  Put, 
  UsePipes, 
  ValidationPipe 
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { 
  ApiBody, 
  ApiOperation, 
  ApiTags 
} from '@nestjs/swagger';
import { ReturnUserDto } from './dtos/return-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from './types/user.type';
import { ApiStandardResponses } from '../decorators/api-responses.decorator';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {}

  @UsePipes(ValidationPipe)
  @Post()
  @ApiOperation({ summary: 'Cria um novo usuário' })
  @ApiBody({ type: CreateUserDto })
  @ApiStandardResponses()
  async create(
    @Body() createUser: CreateUserDto
  ): Promise<User> {
    return await this.userService.create(createUser);
  };

  @Get()
  @ApiOperation({ summary: 'Retorna uma lista com todos os usuários.' })
  @ApiStandardResponses()
  async findAll(): Promise<ReturnUserDto[]> {
    return (await this.userService.findAll()).map(
      (userEntity) => new ReturnUserDto(userEntity)
    );
  };

  @Get('/:id')
  @ApiOperation({ summary: 'Busca um usuário por ID.' })
  @ApiStandardResponses()
  async findOne(
    @Param('id') id: number
  ): Promise<ReturnUserDto> {
    return new ReturnUserDto(
      await this.userService.findOne(id)
    );
  };

  @Put('/:id')
  @ApiOperation({ summary: 'Atualiza informações de um usuário por ID.' })
  @ApiBody({ type: CreateUserDto })
  @ApiStandardResponses()
  async update(
    @Param('id') id: number,
    @Body() updateUser: UpdateUserDto
  ): Promise<ReturnUserDto> {
    return new ReturnUserDto(
      await this.userService.updateUser(id, updateUser)
    );
  };

  @Delete('/:id')
  @ApiOperation({ summary: 'Deleta um usuário por ID.' })
  @ApiStandardResponses()
  async delete(
    @Param('id') id: number
  ): Promise<User> {
    return await this.userService.delete(id);
  };
};
