import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  date:{type:String, required: true},
  login: {type:String, required: true},
  password:{type:String, required: true},
  fullName: String,
  phone: String,
  additionalPhone: String
});