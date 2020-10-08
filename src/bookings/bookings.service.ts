import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';

import { IBooking, IBookingQuery, ISavedClient } from '../interfaces/common.interface';
import { BookingDto } from '../dto/booking.dto';
import { ClientsService } from "../clients/clients.service";

const getRandColor = (brightness: number) => {
  // Six levels of brightness from 0 to 5, 0 being the darkest
  const rgb = [Math.random() * 256, Math.random() * 256, Math.random() * 256];
  const mix = [brightness * 51, brightness * 51, brightness * 51]; //51 => 255/5
  const mixedrgb = [rgb[0] + mix[0], rgb[1] + mix[1], rgb[2] + mix[2]].map(function (x) {
    return Math.round(x / 2.0)
  })

  return "rgb(" + mixedrgb.join(",") + ")";
}

@Injectable()
export class BookingsService {
  constructor(@Inject('BOOKING_MODEL')
              private bookingModel: Model<BookingDto>, private clientsService: ClientsService) {
  }

  async create(createBooking: IBooking): Promise<IBooking | Error> {
    if (createBooking.client.clientId) {
      try {
        const clientId = createBooking.client.clientId;

        let booking = {...createBooking, clientId, color: getRandColor(4)};
        const createdBooking = new this.bookingModel(booking);

        return createdBooking.save();
      } catch (error) {
        return error;
      }
    } else if (createBooking.client) {
      const dateNow = new Date()
      const registerDate = dateNow.toUTCString();
      const client = {...createBooking.client, registerDate};

      this.clientsService.create(client).then((result: ISavedClient) => {
        const clientId = result._id;
        let booking = {...createBooking, clientId, color: getRandColor(0.5)};
        try {
          const createdBooking = new this.bookingModel(booking);

          return createdBooking.save();
        } catch (error) {
          return error;
        }
      }, (error) => Error(error));

    } else {
      return Error('validation failed');
    }
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
            color: booking.color,
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