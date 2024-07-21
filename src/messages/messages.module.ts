import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './message.entity';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { UsersModule } from '../users/users.module';
import { HivesModule } from '../hives/hives.module';

@Module({
  imports: [TypeOrmModule.forFeature([Message]), UsersModule, HivesModule],
  controllers: [MessagesController],
  providers: [MessagesService],
})
export class MessagesModule {}
