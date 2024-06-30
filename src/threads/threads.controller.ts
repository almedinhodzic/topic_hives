import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ThreadsService } from './threads.service';
import { CreateThreadDto } from './dtos/CreateThreadDto';
import { UpdateThreadDto } from './dtos/UpdateThreadDto';

@Controller('threads')
export class ThreadsController {
  constructor(private readonly threadsService: ThreadsService) {}

  @Get()
  async findAll() {
    return await this.threadsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.threadsService.findOne(id);
  }

  @Post()
  async create(@Body() createThreadDto: CreateThreadDto) {
    return await this.threadsService.create(createThreadDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateThreadDto: UpdateThreadDto,
  ) {
    return await this.threadsService.update(id, updateThreadDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.threadsService.remove(id);
  }
}
