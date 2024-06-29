import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DirectMessage } from './direct-message.entity';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { CreateDirectMessageDto } from './dtos/CreateDirectMessageDto';

@Injectable()
export class DirectMessagesService {
  constructor(
    @InjectRepository(DirectMessage)
    private directMessageRepository: Repository<DirectMessage>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findAll() {
    return await this.directMessageRepository.find();
  }

  async create(createDirectMessageDto: CreateDirectMessageDto) {
    const sender = await this.userRepository.findOne({
      where: { id: createDirectMessageDto.senderId },
    });

    if (!sender) {
      throw new BadRequestException(
        'Direct message could not be created. Sender does not exist',
      );
    }

    const receiver = await this.userRepository.findOne({
      where: { id: createDirectMessageDto.receiverId },
    });

    if (!receiver) {
      throw new BadRequestException(
        'Direct message could not be created. Receiver does not exist',
      );
    }

    const directMessage = new DirectMessage();
    directMessage.content = createDirectMessageDto.content;
    directMessage.sender = sender;
    directMessage.receiver = receiver;

    return await this.directMessageRepository.save(directMessage);
  }

  async remove(id: number) {
    const result = await this.directMessageRepository.delete(id);
    if (result.affected === 0) {
      throw new BadRequestException('Direct message could not be deleted');
    }
  }
}
