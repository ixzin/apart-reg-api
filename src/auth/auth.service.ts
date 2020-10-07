import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';
import { Model } from 'mongoose';

import { UsersService } from '../users/users.service';
import { IAuth, IUser } from '../interfaces/common.interface';
import { Crypto } from '../crypto';
import { jwtConstants } from './constants';
import { SessionDto } from '../dto/session.dto';


@Injectable()
export class AuthService {
  constructor(@Inject('SESSION_MODEL')
              private sessionModel: Model<SessionDto>,
              private usersService: UsersService,
              private jwtService: JwtService) {
  }


  async login(loginInfo: IUser): Promise<IAuth | Error> {
    const user = await this.usersService.findOne(loginInfo.login);

    await this.stopUserSession(loginInfo.login);
    if (user && Crypto.decrypt(user.password) === loginInfo.password) {
      const payload = {username: user.login, sub: user._id};
      const refreshToken = jwt.sign(payload, jwtConstants.secret_refresh, {expiresIn: jwtConstants.expired_refresh});

      await this.startNewUserSession(user._id, refreshToken);

      return {
        access_token: this.jwtService.sign(payload),
        refresh_token: refreshToken,
        expires_on: Date.now() + parseInt(jwtConstants.expired) * 1000
      }
    } else {
      return new UnauthorizedException();
    }
  }

  async refreshToken(login: string, refreshToken: string): Promise<IAuth | Error> {
    const user = await this.usersService.findOne(login);
    const payload = {username: user.login, sub: user._id};
    const isTokenValid = this.jwtService.verify(refreshToken, {secret: jwtConstants.secret_refresh});

    if (isTokenValid) {
      const newRefreshToken = jwt.sign(payload, jwtConstants.secret_refresh, {expiresIn: '14d'});
      const session = await this.sessionModel.findOneAndUpdate({refresh: refreshToken}, {refresh: newRefreshToken});

      if (user && isTokenValid && session) {
        return {
          access_token: this.jwtService.sign(payload),
          refresh_token: newRefreshToken,
          expires_on: Date.now() + parseInt(jwtConstants.expired) * 1000
        }
      } else {
        return new UnauthorizedException();
      }
    } else {
      return new UnauthorizedException();
    }
  }

  async startNewUserSession(userId: string, refresh: string) {
    const createdSession = new this.sessionModel({
      dateStart: Date.now(),
      userId: userId,
      refresh: refresh,
      active: true
    });

    return createdSession.save();
  }

  async stopUserSession(login: string) {
    const user = await this.usersService.findOne(login);

    await this.sessionModel.findOneAndRemove({userId: user._id, active: true}, function (err, doc) {
      if (err) return new Error(err);
    });
  }
}