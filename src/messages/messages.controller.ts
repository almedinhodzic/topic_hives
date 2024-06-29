import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dtos/CreateMessageDto';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get()
  async getAll() {
    return await this.messagesService.findAll();
  }

  @Post()
  async create(@Body() createMessageDto: CreateMessageDto) {
    return await this.messagesService.create(createMessageDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.messagesService.remove(id);
  }
}
