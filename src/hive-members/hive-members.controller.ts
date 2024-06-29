import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { HiveMembersService } from './hive-members.service';
import { CreateHiveMemberDto } from './dtos/CreateHiveMemberDto';
import { UpdateHiveMemberDto } from './dtos/UpdateHiveMemberDto';

@Controller('hive-members')
export class HiveMembersController {
  constructor(private readonly hiveMemberService: HiveMembersService) {}

  @Get()
  async findAll() {
    return await this.hiveMemberService.findAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: number) {
    return await this.hiveMemberService.findOne(id);
  }

  @Post()
  async create(@Body() createHiveMemberDto: CreateHiveMemberDto) {
    return await this.hiveMemberService.create(createHiveMemberDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateHiveMemberDto: UpdateHiveMemberDto,
  ) {
    return await this.hiveMemberService.update(id, updateHiveMemberDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.hiveMemberService.remove(id);
  }
}
