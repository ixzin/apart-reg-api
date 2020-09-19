import * as mongoose from 'mongoose';

export const BookingSchema = new mongoose.Schema({
  date:String,
  apartmentId: {type:String, required: true},
  clientId: {type: String, required: true},
  startDate: {type: String, required: true},
  endDate: {type: String, required: true},
  startTime: {type: String, required: true},
  endTime: {type:String, required: true},
  numberOfGuests: {type:Number, required: true}
});