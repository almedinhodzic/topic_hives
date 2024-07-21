import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThreadMessage } from './thread-message.entity';
import { ThreadMessagesController } from './thread-messages.controller';
import { ThreadMessagesService } from './thread-messages.service';
import { UsersModule } from '../users/users.module';
import { ThreadsModule } from '../threads/threads.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ThreadMessage]),
    UsersModule,
    ThreadsModule,
  ],
  controllers: [ThreadMessagesController],
  providers: [ThreadMessagesService],
})
export class ThreadMessagesModule {}
