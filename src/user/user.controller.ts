import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto, EdituserDto } from './dtos';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('users')
  async getMany() {
    const data = await this.userService.getManyUsers();
    return { data };
  }

  @Get('/:id')
  async getOne(@Param('id') id: number) {
    return this.userService.getUser(id);
  }

  @Post('/create/user')
  async createOne(@Body() dto: CreateUserDto) {
    const newUser = await this.userService.createUser(dto);
    return { message: 'User created', newUser };
  }

  @Put(':id')
  async editOne(@Param('id') id: number, @Body() dto: EdituserDto) {
    const data = await this.userService.editUser(id, dto);
    return { message: 'User edited', data }; 
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: number) {
    const data = await this.userService.deleteUser(id);
    return { message: 'User deleted ', data };
  }
}
