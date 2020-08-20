import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';

import { IUser } from '../interfaces/common.interface';
import { UserDto } from '../dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<UserDto>,
  ) {}

  async create(createUserDto: IUser): Promise<IUser> {
    if (!createUserDto.date) {
      const dateNow = new Date();
      createUserDto.date = dateNow.toUTCString();
    }
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findAll(): Promise<IUser[]> {
    return this.userModel.find().exec();
  }

  async findOne(username: string): Promise<IUser | undefined> {
    return this.userModel.findOne({ login: username}).exec();
  }

}