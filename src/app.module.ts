import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { HivesModule } from './hives/hives.module';
import { HiveMembersModule } from './hive-members/hive-members.module';
import { MessagesModule } from './messages/messages.module';
import { DirectMessagesModule } from './direct-messages/direct-messages.module';
import { ThreadsModule } from './threads/threads.module';
import { ThreadMessagesModule } from './thread-messages/thread-messages.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    HivesModule,
    HiveMembersModule,
    MessagesModule,
    DirectMessagesModule,
    ThreadsModule,
    ThreadMessagesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: String(process.env.DB_PASSWORD),
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
