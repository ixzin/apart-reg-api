import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';
import { ClientsProviders } from './clients.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [ClientsController],
  providers: [
    ClientsService,
    ...ClientsProviders,
  ],
})
export class ClientsModule {}