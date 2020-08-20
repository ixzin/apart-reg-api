import * as mongoose from 'mongoose';

export const BookingSchema = new mongoose.Schema({
  date:String,
  firstName: {type:String, required: true},
  lastName: {type:String, required: true},
  phone1:{type:String, required: true},
  phone2: String,
  registerCity: {type: String, required: true},
  img: String
});