import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Thread } from './thread.entity';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { Hive } from '../hives/hive.entity';
import { CreateThreadDto } from './dtos/CreateThreadDto';
import { UpdateThreadDto } from './dtos/UpdateThreadDto';

@Injectable()
export class ThreadsService {
  constructor(
    @InjectRepository(Thread) private threadRepository: Repository<Thread>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Hive) private hiveRepository: Repository<Hive>,
  ) {}

  async findAll() {
    return await this.threadRepository.find();
  }

  async findOne(id: number) {
    const thread = await this.threadRepository.findOne({ where: { id } });
    if (!thread) {
      throw new NotFoundException('Thread does not exist');
    }

    return thread;
  }

  async create(createThreadDto: CreateThreadDto) {
    const user = await this.userRepository.findOne({
      where: { id: createThreadDto.userId },
    });
    if (!user) {
      throw new BadRequestException('User does not exist');
    }

    const hive = await this.hiveRepository.findOne({
      where: { id: createThreadDto.hiveId },
    });
    if (!hive) {
      throw new BadRequestException('Hive does not exist');
    }

    const thread = new Thread();
    thread.title = createThreadDto.title;
    thread.user = user;
    thread.hive = hive;
    return await this.threadRepository.save(thread);
  }

  async update(id: number, updateThreadDto: UpdateThreadDto) {
    const thread = await this.threadRepository.findOne({ where: { id } });
    if (!thread) {
      throw new BadRequestException('Thread does not exist');
    }

    Object.assign(thread, updateThreadDto);
    return await this.threadRepository.save(thread);
  }

  async remove(id: number) {
    const result = await this.threadRepository.delete(id);
    if (result.affected === 0) {
      throw new BadRequestException('Thread could not be deleted');
    }
  }
}
