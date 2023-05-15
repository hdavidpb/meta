import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import { Profile } from './profiles.entity';
import { Task } from './tasks.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToOne(() => Profile, (profile) => profile.id)
  profile: Profile;

  @JoinColumn()
  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];

  // @OneToMany(() => Month, (month) => month.user)
  // month: Month[];

  // @OneToMany((type) => Year, (year) => year.id)
  // year: Year[];
}
