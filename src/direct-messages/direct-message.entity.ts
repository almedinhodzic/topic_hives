import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class DirectMessage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @ManyToOne(() => User, (user) => user.directMessagesSent)
  sender: User;

  @ManyToOne(() => User, (user) => user.directMessagesReceived)
  receiver: User;

  @CreateDateColumn()
  createdAt: Date;
}
