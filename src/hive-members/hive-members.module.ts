import { Module } from '@nestjs/common';
import { HiveMembersController } from './hive-members.controller';
import { HiveMembersService } from './hive-members.service';
import { HivesModule } from '../hives/hives.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HiveMember } from './hive-member.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([HiveMember]), HivesModule, UsersModule],
  controllers: [HiveMembersController],
  providers: [HiveMembersService],
})
export class HiveMembersModule {}
