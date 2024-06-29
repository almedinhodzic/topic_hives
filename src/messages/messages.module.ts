import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './message.entity';
import { User } from '../users/user.entity';
import { Hive } from '../hives/hive.entity';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';

@Module({
  imports: [TypeOrmModule.forFeature([Message, User, Hive])],
  controllers: [MessagesController],
  providers: [MessagesService],
})
export class MessagesModule {}
