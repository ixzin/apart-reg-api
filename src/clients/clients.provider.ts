import { Connection } from 'mongoose';
import { ClientSchema } from '../database/schemas/client.schema';

export const ClientsProviders = [
  {
    provide: 'CLIENT_MODEL',
    useFactory: (connection: Connection) => connection.model('Client', ClientSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];