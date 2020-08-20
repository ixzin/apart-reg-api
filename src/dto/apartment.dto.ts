import { Document } from 'mongoose';

export interface ApartmentDto extends Document {
  readonly street: string;
  readonly building:string;
  readonly floor: number;
}