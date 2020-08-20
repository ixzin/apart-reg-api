import { Document } from 'mongoose';

export interface UserDto extends Document {
  readonly login:string;
  readonly password:string;
  readonly fullName?: string;
  readonly phone?: string;
  readonly additionalPhone?: string;
}