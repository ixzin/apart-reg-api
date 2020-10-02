import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';

import { UsersService } from '../users/users.service';
import { IUser } from '../interfaces/common.interface';
import { Crypto } from '../crypto';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}


  async login(loginInfo: IUser) {
    const user = await this.usersService.findOne(loginInfo.login);

    if (user && Crypto.decrypt(user.password) === loginInfo.password) {
      const payload = { username: user.login, sub: user._id };
      return {
        access_token: this.jwtService.sign(payload),
        refresh_token: jwt.sign(payload, jwtConstants.secret, { expiresIn: '14d' })
      }
    } else {
      return new UnauthorizedException();
    }
  }
}