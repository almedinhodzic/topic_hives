import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Hive } from '../hives/hive.entity';
import { User } from '../users/user.entity';

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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
