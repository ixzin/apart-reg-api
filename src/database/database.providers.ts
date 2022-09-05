import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect('mongodb://localhost/apartdb',{
        useCreateIndex: true,
        user:"admin",
        pass:""
      }),
  },
];
