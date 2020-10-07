import { Get, Post, Controller, Put, Delete, Body, UseGuards, Query } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { BookingsService } from './bookings.service';
import { IBooking, IBookingQuery, ISavedClient } from '../interfaces/common.interface';
import { BookingDto } from '../dto/booking.dto';
import { ClientsService } from '../clients/clients.service';

@Controller('bookings')
export class BookingsControllers {

  constructor(private bookingsService: BookingsService, private clientsService: ClientsService) {

  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<IBooking[]> {
    return this.bookingsService.findAll();
  }

  @Get('period')
  async findByPeriod(@Query() params: IBookingQuery) {
    return this.bookingsService.findByPeriod(params);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createBooking: BookingDto) {
    if (createBooking.client.clientId) {
      try {
        const clientId = createBooking.client.clientId;

        let booking = {...createBooking, clientId};
        return this.bookingsService.create(booking);
      }
      catch (error) {
        return error;
      }
    } else if (createBooking.client) {
      const dateNow = new Date()
      const registerDate = dateNow.toUTCString();
      const client = {...createBooking.client, registerDate};
      this.clientsService.create(client).then((result: ISavedClient) => {
        const clientId = result._id;
        let booking = {...createBooking, clientId};
        try {
          return this.bookingsService.create(booking);
        }
        catch (error) {
          return error;
        }
      }, (error) => Error(error));

    } else {
      return Error('validation failed');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async update() {
    return 'aa';
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async remove() {
    return 'bb';
  }

}