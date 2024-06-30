import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThreadMessage } from './thread-message.entity';
import { User } from '../users/user.entity';
import { Thread } from '../threads/thread.entity';
import { ThreadMessagesController } from './thread-messages.controller';
import { ThreadMessagesService } from './thread-messages.service';

@Module({
  imports: [TypeOrmModule.forFeature([ThreadMessage, User, Thread])],
  controllers: [ThreadMessagesController],
  providers: [ThreadMessagesService],
})
export class ThreadMessagesModule {}
