import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';

import { IApartment } from '../interfaces/common.interface';
import { ApartmentsDto } from '../dto/apartments.dto';

@Injectable()
export class ApartmentsService {
  constructor(
    @Inject('APARTMENT_MODEL')
    private apartmentModel: Model<ApartmentsDto>,
  ) {}

  async create(createApartmentDto: IApartment): Promise<IApartment> {
    const createdApartment = new this.apartmentModel(createApartmentDto);
    return createdApartment.save();
  }

  async findAll(): Promise<IApartment[]> {
    return this.apartmentModel.find().exec();
  }
}