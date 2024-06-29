import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Hive } from '../hives/hive.entity';
import { HiveRole } from '../common/types/HiveRole';

@Entity()
export class HiveMember {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Hive, (hive) => hive.members)
  hive: Hive;

  @Column({
    type: 'enum',
    enum: HiveRole,
    default: HiveRole.member,
  })
  role: HiveRole;

  @CreateDateColumn()
  joinedAt: Date;
}
