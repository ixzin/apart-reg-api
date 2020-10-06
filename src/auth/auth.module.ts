import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';
import { UsersProviders } from '../users/users.provider';
import { DatabaseModule } from '../database/database.module';


import { AuthController } from './auth.controller';


import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { SessionsProviders } from './sessions.provider';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    PassportModule.register(
      {
        defaultStrategy: 'jwt'
      }
    ),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {expiresIn: jwtConstants.expired},
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    UsersService,
    ...UsersProviders,
    ...SessionsProviders
  ]
})
export class AuthModule {
}
