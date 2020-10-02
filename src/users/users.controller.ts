import { Get, Post, Controller, Put, Delete, Body, UseGuards } from '@nestjs/common';

import { UsersService } from './users.service';
import { UserDto } from '../dto/user.dto';
import { IUser } from '../interfaces/common.interface';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Crypto } from '../crypto';

@Controller('users')
export class UsersController {

  constructor(private usersService: UsersService) {

  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<IUser[]> {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createUser: UserDto) {
    try {
      const user = {...createUser, password: Crypto.encrypt(createUser.password)};
      return this.usersService.create(user);
    } catch (error) {
      return error;
    }
  }

  //
  @UseGuards(JwtAuthGuard)
  @Put()
  async update() {
    return 'aa';
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async remove() {
    return 'bb';
  }

}