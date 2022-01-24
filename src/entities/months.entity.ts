import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './users.entity';
import { Week } from './weeks.entity';
import { Year } from './years.entity';

@Entity()
export class Month {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  monthName: string;

  @Column()
  monthNumber: number;

  @ManyToOne((type) => User, (user) => user.month)
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany((type) => Week, (week) => week.month)
  weeks: Week[];

  @ManyToOne(() => Year, (year) => year)
  @JoinColumn()
  year: Year;
}
