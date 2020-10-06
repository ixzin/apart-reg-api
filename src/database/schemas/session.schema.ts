import * as mongoose from 'mongoose';

export const SessionSchema = new mongoose.Schema({
  dateStart:{type:Number, required: true},
  dateEnd:Number,
  userId: {type:String, required: true},
  refresh:{type:String, required: true},
  active: Boolean
});