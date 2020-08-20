import { Document } from 'mongoose';

export interface BookingDto extends Document {
  apartmentId: string;
  startDateTime:string;
  endDateTime: string;
  clientId: string;
  numberOfGuests: number;
}