import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { HivesService } from './hives.service';
import { CreateHiveDto } from './dtos/CreateHiveDto';
import { UpdateHiveDto } from './dtos/UpdateHiveDto';

@Controller('hives')
export class HivesController {
  constructor(private readonly hiveService: HivesService) {}
  @Get()
  async findAll() {
    return await this.hiveService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.hiveService.findOne(id);
  }

  @Post()
  async create(@Body() createHiveDto: CreateHiveDto) {
    return await this.hiveService.create(createHiveDto);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateHiveDto: UpdateHiveDto) {
    return await this.hiveService.update(id, updateHiveDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.hiveService.remove(id);
  }
}
