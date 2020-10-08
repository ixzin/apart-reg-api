import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { ClientDto } from '../dto/client.dto';
import { IBooking, IClient } from '../interfaces/common.interface';

@Injectable()
export class ClientsService {
  constructor(
    @Inject('CLIENT_MODEL')
    private clientModel: Model<ClientDto>,
  ) {}

  async create(createClientDto: IClient): Promise<IClient> {
    const createdClient = new this.clientModel(createClientDto);
    return createdClient.save();
  }

  async findAll(): Promise<IClient[]> {
    return this.clientModel.find().exec();
  }

  async findOne(id: string): Promise<IClient> {
    return this.clientModel.findById(id).exec();
  }
}