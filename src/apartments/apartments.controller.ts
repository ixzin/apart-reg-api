import { Get, Post, Controller, Put, Delete, Body } from '@nestjs/common';
import { ApartmentsService } from './apartments.service';
import { ApartmentsDto } from '../dto/apartments.dto';
import { IApartment } from '../interfaces/common.interface';

@Controller('apartments')
export class ApartmentsController {

  constructor(private apartmentsService: ApartmentsService) {

  }

  @Get()
  async findAll(): Promise<IApartment[]> {
    return this.apartmentsService.findAll();
  }

  @Post()
  async create(@Body() createApartment: ApartmentsDto) {
    try {
      return this.apartmentsService.create(createApartment);
    } catch (error) {
      return error;
    }
  }

  //
  @Put()
  async update() {
    return 'aa';
  }

  @Delete()
  async remove() {
    return 'bb';
  }

}