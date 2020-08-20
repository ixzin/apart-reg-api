import { Get, Post, Controller, Put, Delete, Body, UseGuards } from '@nestjs/common';
import { ApartmentsService } from './apartments.service';
import { ApartmentDto } from '../dto/apartment.dto';
import { IApartment } from '../interfaces/common.interface';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('apartments')
export class ApartmentsController {

  constructor(private apartmentsService: ApartmentsService) {

  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<IApartment[]> {
    return this.apartmentsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createApartment: ApartmentDto) {
    try {
      return this.apartmentsService.create(createApartment);
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