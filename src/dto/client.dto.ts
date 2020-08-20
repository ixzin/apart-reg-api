import { Document } from 'mongoose';

export interface ClientDto extends Document {
  readonly registerDate: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly registerCity: string;
  readonly img?: string;
  readonly phone1: string;
  readonly phone2?: string;
}