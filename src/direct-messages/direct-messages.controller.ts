import { Controller, Get, Post, Param, Body, Delete } from '@nestjs/common';
import { DirectMessagesService } from './direct-messages.service';
import { CreateDirectMessageDto } from './dtos/CreateDirectMessageDto';

@Controller('direct-messages')
export class DirectMessagesController {
  constructor(private readonly directMessagesService: DirectMessagesService) {}

  @Get()
  async findAll() {
    return await this.directMessagesService.findAll();
  }

  @Post()
  async create(@Body() createDirectMessageDto: CreateDirectMessageDto) {
    return await this.directMessagesService.create(createDirectMessageDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.directMessagesService.remove(id);
  }
}
