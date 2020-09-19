import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { BookingsControllers } from './bookings.controller';
import { BookingsService } from './bookings.service';
import { BookingsProviders } from './bookings.provider';
import { ClientsService } from '../clients/clients.service';
import { ClientsProviders } from '../clients/clients.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [BookingsControllers],
  providers: [
    BookingsService,
    ClientsService,
    ...BookingsProviders,
    ...ClientsProviders
  ],
})
export class BookingsModule {
}