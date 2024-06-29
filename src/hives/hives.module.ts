import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hive } from './hive.entity';
import { HivesController } from './hives.controller';
import { HivesService } from './hives.service';
import { User } from '../users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Hive, User])],
  controllers: [HivesController],
  providers: [HivesService],
})
export class HivesModule {}
