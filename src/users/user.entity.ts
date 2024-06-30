import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import { Hive } from '../hives/hive.entity';
import { Message } from '../messages/message.entity';
import { DirectMessage } from '../direct-messages/direct-message.entity';
import { Thread } from '../threads/thread.entity';
import { ThreadMessage } from '../thread-messages/thread-message.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @OneToMany(() => Hive, (hive) => hive.user)
  hives: Hive[];

  @OneToMany(() => Message, (message) => message.user)
  messages: Message[];

  @OneToMany(() => DirectMessage, (directMessage) => directMessage.sender)
  directMessagesSent: DirectMessage[];

  @OneToMany(() => DirectMessage, (directMessage) => directMessage.receiver)
  directMessagesReceived: DirectMessage[];

  @OneToMany(() => Thread, (thread) => thread.user)
  threads: Thread[];

  @OneToMany(() => ThreadMessage, (threadMessage) => threadMessage.user)
  threadMessages: ThreadMessage[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
