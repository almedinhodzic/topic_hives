import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Thread } from './thread.entity';
import { User } from '../users/user.entity';
import { Hive } from '../hives/hive.entity';
import { ThreadsController } from './threads.controller';
import { ThreadsService } from './threads.service';

@Module({
  imports: [TypeOrmModule.forFeature([Thread, User, Hive])],
  controllers: [ThreadsController],
  providers: [ThreadsService],
})
export class ThreadsModule {}
