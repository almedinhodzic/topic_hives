import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from '../users/user.entity';
import { HiveMember } from '../hive-members/hive-member.entity';
import { Message } from '../messages/message.entity';
import { Thread } from '../threads/thread.entity';

@Entity()
export class Hive {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  isPrivate: boolean;

  @ManyToOne(() => User, (user) => user.hives)
  user: User;

  @OneToMany(() => HiveMember, (member) => member.hive)
  members: HiveMember[];

  @OneToMany(() => Message, (message) => message.hive)
  messages: Message[];

  @OneToMany(() => Thread, (thread) => thread.hive)
  threads: Thread[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
