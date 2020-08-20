import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { IUser } from '../interfaces/common.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}


  async login(loginInfo: IUser) {
    const user = await this.usersService.findOne(loginInfo.login);
    if (user && user.password === loginInfo.password) {
      const payload = { username: user.login, sub: user._id };
      return {
        access_token: this.jwtService.sign(payload),
      }
    } else {
      return new UnauthorizedException();
    }
  }
}