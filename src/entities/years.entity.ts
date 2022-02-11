import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Month } from './months.entity';
import { User } from './users.entity';

@Entity()
export class Year {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column()
  year: string;

  @OneToMany((type) => Month, (month) => month.id)
  month: Month[];

  @ManyToOne((type) => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
