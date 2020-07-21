import { Connection } from 'mongoose';
import { ApartmentSchema } from '../database/schemas/apartment.schema';

export const ApartmentsProviders = [
  {
    provide: 'APARTMENT_MODEL',
    useFactory: (connection: Connection) => connection.model('Apartment', ApartmentSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];