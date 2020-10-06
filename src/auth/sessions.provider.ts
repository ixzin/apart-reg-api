import { Connection } from 'mongoose';

import { SessionSchema } from '../database/schemas/session.schema';

export const SessionsProviders = [
  {
    provide: 'SESSION_MODEL',
    useFactory: (connection: Connection) => connection.model('Session', SessionSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];