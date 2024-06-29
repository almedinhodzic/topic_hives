import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HiveMember } from './hive-member.entity';
import { Repository } from 'typeorm';
import { CreateHiveMemberDto } from './dtos/CreateHiveMemberDto';
import { Hive } from '../hives/hive.entity';
import { User } from '../users/user.entity';
import { UpdateHiveMemberDto } from './dtos/UpdateHiveMemberDto';

@Injectable()
export class HiveMembersService {
  constructor(
    @InjectRepository(HiveMember)
    private hiveMemberRepository: Repository<HiveMember>,
    @InjectRepository(Hive) private hiveRepository: Repository<Hive>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async findAll() {
    return await this.hiveMemberRepository.find();
  }
  async findOne(id: number) {
    const hiveMember = await this.hiveMemberRepository.findOne({
      where: { id },
    });
    if (!hiveMember) {
      throw new NotFoundException('Hive member does not exist');
    }
    return hiveMember;
  }
  async create(createHiveMemberDto: CreateHiveMemberDto) {
    const hiveMember = new HiveMember();
    const hive = await this.hiveRepository.findOne({
      where: { id: createHiveMemberDto.hiveId },
    });

    if (!hive) {
      throw new BadRequestException('Hive does not exist');
    }

    const user = await this.userRepository.findOne({
      where: { id: createHiveMemberDto.userId },
    });

    if (!user) {
      throw new BadRequestException('User does not exist');
    }

    hiveMember.hive = hive;
    hiveMember.user = user;
    hiveMember.role = createHiveMemberDto.role;

    return await this.hiveMemberRepository.save(hiveMember);
  }
  async update(id: number, updateHiveMemberDto: UpdateHiveMemberDto) {
    const hiveMember = await this.hiveMemberRepository.findOne({
      where: { id },
    });
    if (!hiveMember) {
      throw new BadRequestException('Hive member does not exist');
    }
    Object.assign(hiveMember, updateHiveMemberDto);
    return await this.hiveMemberRepository.save(hiveMember);
  }
  async remove(id: number) {
    const result = await this.hiveMemberRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(
        'Hive member does not exist and could not be deleted',
      );
    }
  }
}
