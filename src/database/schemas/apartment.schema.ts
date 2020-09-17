import * as mongoose from 'mongoose';

export const ApartmentSchema = new mongoose.Schema({
  street: {type: String, required: true},
  building:{type:String, required: true},
  flat: {type:String, required: true},
  floor: {type:Number,required: true},
  generalArea: {type:Number,required: true},
  lifeArea: {type:Number,required: true},
  kitchenArea:{type:Number,required: true},
  rooms: {type:Number,required: true},
});