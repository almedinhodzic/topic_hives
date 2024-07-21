import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DirectMessage } from './direct-message.entity';
import { Repository } from 'typeorm';
import { CreateDirectMessageDto } from './dtos/CreateDirectMessageDto';
import { UsersService } from '../users/users.service';

@Injectable()
export class DirectMessagesService {
  constructor(
    @InjectRepository(DirectMessage)
    private directMessageRepository: Repository<DirectMessage>,
    private readonly usersService: UsersService,
  ) {}

  async findAll() {
    return await this.directMessageRepository.find();
  }

  async create(createDirectMessageDto: CreateDirectMessageDto) {
    const sender = await this.usersService.findOne(
      createDirectMessageDto.senderId,
    );

    if (!sender) {
      throw new BadRequestException(
        'Direct message could not be created. Sender does not exist',
      );
    }

    const receiver = await this.usersService.findOne(
      createDirectMessageDto.receiverId,
    );

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
