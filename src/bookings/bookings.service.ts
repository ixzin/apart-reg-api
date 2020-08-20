import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';

import { IBooking } from '../interfaces/common.interface';
import { BookingDto } from '../dto/booking.dto';

@Injectable()
export class BookingsService {
  constructor(
    @Inject('BOOKING_MODEL')
    private bookingModel: Model<BookingDto>,
  ) {}

  async create(createBookingDto: IBooking): Promise<IBooking> {
    const createdBooking = new this.bookingModel(createBookingDto);
    return createdBooking.save();
  }

  async findAll(): Promise<IBooking[]> {
    return this.bookingModel.find().exec();
  }
}