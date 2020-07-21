import { Document } from 'mongoose';

export interface ApartmentsDto extends Document {
  readonly street: string;
  readonly building:string;
  readonly floor: number;
}