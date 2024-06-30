import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { ThreadMessagesService } from './thread-messages.service';
import { CreateThreadMessageDto } from './CreateThreadMessageDto';

@Controller('thread-messages')
export class ThreadMessagesController {
  constructor(private readonly threadMessagesService: ThreadMessagesService) {}

  @Get()
  async findAll() {
    return await this.threadMessagesService.findAll();
  }

  @Post()
  async create(@Body() createThreadMsgDto: CreateThreadMessageDto) {
    return await this.threadMessagesService.create(createThreadMsgDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.threadMessagesService.remove(id);
  }
}
