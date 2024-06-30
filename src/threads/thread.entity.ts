import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Hive } from '../hives/hive.entity';
import { User } from '../users/user.entity';
import { ThreadMessage } from '../thread-messages/thread-message.entity';

@Entity()
export class Thread {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => Hive, (hive) => hive.threads)
  hive: Hive;

  @ManyToOne(() => User, (user) => user.threads)
  user: User;

  @OneToMany(() => ThreadMessage, (threadMessage) => threadMessage.thread)
  messages: ThreadMessage[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
