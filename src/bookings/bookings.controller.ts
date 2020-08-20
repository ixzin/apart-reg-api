import { Get, Post, Controller, Put, Delete, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { BookingsService } from './bookings.service';
import { IBooking } from '../interfaces/common.interface';
import { BookingDto } from '../dto/booking.dto';

@Controller('bookings')
export class BookingsControllers {

  constructor(private bookingsService: BookingsService) {

  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<IBooking[]> {
    return this.bookingsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createBooking: BookingDto) {
    try {
      return this.bookingsService.create(createBooking);
    } catch (error) {
      return error;
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