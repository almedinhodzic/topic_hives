import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HiveMember } from './hive-member.entity';
import { HiveMembersController } from './hive-members.controller';
import { HiveMembersService } from './hive-members.service';
import { Hive } from '../hives/hive.entity';
import { User } from '../users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HiveMember, Hive, User])],
  controllers: [HiveMembersController],
  providers: [HiveMembersService],
})
export class HiveMembersModule {}
