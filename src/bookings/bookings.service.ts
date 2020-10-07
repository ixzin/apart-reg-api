import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';

import { IBooking, IBookingQuery } from '../interfaces/common.interface';
import { BookingDto } from '../dto/booking.dto';

@Injectable()
export class BookingsService {
  constructor(@Inject('BOOKING_MODEL')
              private bookingModel: Model<BookingDto>,) {
  }

  async create(createBookingDto: IBooking): Promise<IBooking> {
    const createdBooking = new this.bookingModel(createBookingDto);
    return createdBooking.save();
  }

  async findAll(): Promise<IBooking[]> {
    return this.bookingModel.find().exec();
  }

  async findByPeriod(params: IBookingQuery): Promise<any[]> {
    const start = new Date(params.startDate);
    const end = new Date(params.endDate);

    if (start.getTime() <= end.getTime()) {
      const bookingData = await this.bookingModel.find({
        apartmentId: params.apartmentId,
        $or: [{startDate: {'$gte': params.startDate, '$lt': params.endDate}}, {
          endDate: {
            '$gte': params.startDate,
            '$lt': params.endDate
          }
        }]
      }).exec();

      let bookingMap = [];

      bookingData.forEach((booking: IBooking) => {
        let startDate = new Date(booking.startDate);
        let endDate = new Date(booking.endDate);

        if (startDate.getTime() < start.getTime()) {
          startDate = start;
        }

        if (endDate.getTime() > end.getTime()) {
          endDate = end;
        }

        let date = new Date(startDate.valueOf());

        while (date.getTime() <= endDate.getTime()) {
          bookingMap.push({
            date: date.toString(),
            bookingId: booking._id,
            isStart: isDatesEquals(booking.startDate, date),
            isEnd: isDatesEquals(booking.endDate, date)
          });
          date.setUTCDate(date.getDate() + 1);
        }
      });

      function isDatesEquals(date1, date2): boolean {
        const firstDate = new Date(date1);
        const secondDate = new Date(date2);

        return firstDate.getTime() === secondDate.getTime();
      }

      return bookingMap.sort((a, b) => {
        let date1 = new Date(a.date);
        let date2 = new Date(b.date);

        return date1.getTime() - date2.getTime();
      });
    } else {
      throw new Error('start Date more then end');
    }
  }
}