import { Module } from '@nestjs/common';
import { ApartmentsModule } from './apartments/apartments.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BookingsModule } from './bookings/bookings.module';
import { ClientsModule } from './clients/clients.module';

@Module({
  imports: [
    ApartmentsModule,
    UsersModule,
    AuthModule,
    BookingsModule,
    ClientsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
