import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hive } from './hive.entity';
import { CreateHiveDto } from './dtos/CreateHiveDto';
import { UpdateHiveDto } from './dtos/UpdateHiveDto';
import { User } from '../users/user.entity';

@Injectable()
export class HivesService {
  constructor(
    @InjectRepository(Hive) private hiveRepository: Repository<Hive>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async findAll() {
    return await this.hiveRepository.find();
  }
  async findOne(id: number) {
    const hive = await this.hiveRepository.findOne({ where: { id } });
    if (!hive) {
      throw new NotFoundException('Hive does not exist');
    }
    return hive;
  }

  async create(createHiveDto: CreateHiveDto) {
    const hive = new Hive();
    const user = await this.userRepository.findOne({
      where: { id: createHiveDto.userId },
    });
    if (!user) {
      throw new BadRequestException('Bad request');
    }
    hive.name = createHiveDto.name;
    hive.description = createHiveDto.description;
    hive.isPrivate = createHiveDto.isPrivate;
    hive.user = user;

    return await this.hiveRepository.save(hive);
  }

  async update(id: number, updateHiveDto: UpdateHiveDto) {
    const hive = await this.hiveRepository.findOne({ where: { id } });
    if (!hive) {
      throw new NotFoundException('Hive does not exist');
    }
    Object.assign(hive, updateHiveDto);
    return await this.hiveRepository.save(hive);
  }

  async remove(id: number) {
    const result = await this.hiveRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(
        'Hive does not exist and could not be deleted',
      );
    }
  }
}
