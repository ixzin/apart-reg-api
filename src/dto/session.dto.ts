import { Document } from 'mongoose';

export interface SessionDto extends Document {
  readonly dateStart: number;
  readonly dateEnd: number;
  readonly userId: string;
  readonly refresh?: string;
  readonly active: boolean;
}