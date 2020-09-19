import { Document } from 'mongoose';
import { ClientDto } from './client.dto';

export interface BookingDto extends Document {
  readonly apartmentId: string;
  readonly client: ClientDto;
  readonly startDate:string;
  readonly endDate: string;
  readonly startTime: string;
  readonly endTime: string;
  readonly numberOfGuests: number;
}