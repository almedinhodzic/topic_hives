import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Thread } from '../threads/thread.entity';

@Entity()
export class ThreadMessage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @ManyToOne(() => User, (user) => user.threadMessages)
  user: User;

  @ManyToOne(() => Thread, (thread) => thread.messages)
  thread: Thread;

  @CreateDateColumn()
  createdAt: Date;
}
