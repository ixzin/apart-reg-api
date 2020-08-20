import { Module } from '@nestjs/common';
import { ApartmentsModule } from './apartments/apartments.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ApartmentsModule, UsersModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
