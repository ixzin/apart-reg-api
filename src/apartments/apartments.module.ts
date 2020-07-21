import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ApartmentsController } from './apartments.controller';
import { ApartmentsService } from './apartments.service';
import { ApartmentsProviders } from './apartments.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [ApartmentsController],
  providers: [
    ApartmentsService,
    ...ApartmentsProviders,
  ],
})
export class ApartmentsModule {}