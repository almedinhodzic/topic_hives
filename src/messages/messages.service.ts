import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './message.entity';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dtos/CreateMessageDto';
import { UsersService } from '../users/users.service';
import { HivesService } from '../hives/hives.service';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message) private messagesRepository: Repository<Message>,

    private readonly usersService: UsersService,
    private readonly hivesService: HivesService,
  ) {}
  async findAll() {
    return await this.messagesRepository.find();
  }
  async create(creteMessageDto: CreateMessageDto) {
    const user = await this.usersService.findOne(creteMessageDto.userId);
    if (!user) {
      throw new BadRequestException('Message could not be created');
    }
    const hive = await this.hivesService.findOne(creteMessageDto.hiveId);
    if (!hive) {
      throw new BadRequestException('Message could not be created');
    }
    const message = new Message();
    message.user = user;
    message.hive = hive;
    message.content = creteMessageDto.content;
    return await this.messagesRepository.save(message);
  }
  async remove(id: number) {
    const result = await this.messagesRepository.delete(id);
    if (result.affected === 0) {
      throw new BadRequestException('Message could not be deleted');
    }
  }
}
