import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './message.entity';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dtos/CreateMessageDto';
import { User } from '../users/user.entity';
import { Hive } from '../hives/hive.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message) private messagesRepository: Repository<Message>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Hive) private hiveRepository: Repository<Hive>,
  ) {}
  async findAll() {
    return await this.messagesRepository.find();
  }
  async create(creteMessageDto: CreateMessageDto) {
    const user = await this.userRepository.findOne({
      where: { id: creteMessageDto.userId },
    });
    if (!user) {
      throw new BadRequestException('Message could not be created');
    }
    const hive = await this.hiveRepository.findOne({
      where: { id: creteMessageDto.hiveId },
    });
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
