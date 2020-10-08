import { Get, Post, Controller, Put, Delete, Body, UseGuards, Query, Param } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { BookingsService } from './bookings.service';
import { IBooking, IBookingQuery, ISavedClient } from '../interfaces/common.interface';
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
  @Get('period')
  async findByPeriod(@Query() params: IBookingQuery) {
    return this.bookingsService.findByPeriod(params);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param() params) {
    return this.bookingsService.findOne(params.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createBooking: BookingDto) {
    return this.bookingsService.create(createBooking);
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