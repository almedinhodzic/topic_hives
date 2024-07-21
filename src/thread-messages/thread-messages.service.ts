import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ThreadMessage } from './thread-message.entity';
import { Repository } from 'typeorm';
import { CreateThreadMessageDto } from './CreateThreadMessageDto';
import { UsersService } from '../users/users.service';
import { ThreadsService } from '../threads/threads.service';

@Injectable()
export class ThreadMessagesService {
  constructor(
    @InjectRepository(ThreadMessage)
    private threadMessagesRepository: Repository<ThreadMessage>,

    private readonly usersService: UsersService,
    private readonly threadsService: ThreadsService,
  ) {}

  async findAll() {
    return await this.threadMessagesRepository.find();
  }

  async create(createThreadMessage: CreateThreadMessageDto) {
    const user = await this.usersService.findOne(createThreadMessage.userId);
    if (!user) {
      throw new BadRequestException('User does not exist');
    }

    const thread = await this.threadsService.findOne(
      createThreadMessage.threadId,
    );
    if (!thread) {
      throw new BadRequestException('Thread does not exist');
    }

    const threadMessage = new ThreadMessage();
    threadMessage.content = createThreadMessage.content;
    threadMessage.thread = thread;
    threadMessage.user = user;

    return await this.threadMessagesRepository.save(threadMessage);
  }

  async remove(id: number) {
    const result = await this.threadMessagesRepository.delete(id);
    if (result.affected === 0) {
      throw new BadRequestException(
        'Message not find and coult not be deleted',
      );
    }
  }
}
