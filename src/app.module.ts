import { Module } from '@nestjs/common';
import { ApartmentsModule } from './apartments/apartments.module';

@Module({
  imports: [ApartmentsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
