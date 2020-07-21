import * as mongoose from 'mongoose';

export const ApartmentSchema = new mongoose.Schema({
  street: {type: String, required: true},
  building:{type:String, required: true},
  floor: Number
});