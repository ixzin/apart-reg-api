import { Get, Post, Controller, Put, Delete, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ClientsService } from './clients.service';
import { IClient } from '../interfaces/common.interface';
import { ClientDto } from '../dto/client.dto';

@Controller('clients')
export class ClientsController {

  constructor(private clientsService: ClientsService) {

  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<IClient[]> {
    return this.clientsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createClient: ClientDto) {
    try {
      return this.clientsService.create(createClient);
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