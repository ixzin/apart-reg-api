import { Connection } from 'mongoose';
import { BookingSchema } from '../database/schemas/booking.schema';

export const BookingsProviders = [
  {
    provide: 'BOOKING_MODEL',
    useFactory: (connection: Connection) => connection.model('Booking', BookingSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];