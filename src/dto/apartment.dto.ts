import { Document } from 'mongoose';

export interface ApartmentDto extends Document {
  readonly street: string;
  readonly building:string;
  readonly floor: number;
  readonly flat: string;
  readonly generalArea: number;
  readonly lifeArea: number;
  readonly kitchenArea:number;
  readonly rooms: number;
}