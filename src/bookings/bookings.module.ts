import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { BookingsControllers } from './bookings.controller';
import { BookingsService } from './bookings.service';
import { BookingsProviders } from './bookings.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [BookingsControllers],
  providers: [
    BookingsService,
    ...BookingsProviders,
  ],
})
export class BookingsModule {}