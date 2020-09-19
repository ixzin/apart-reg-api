import { Document } from 'mongoose';

export interface ClientDto extends Document {
  readonly clientId?: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly registerCity: string;
  readonly img?: string;
  readonly phone1: string;
  readonly phone2?: string;
  readonly comment?: string;
}