import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Year } from './years.entity';
import { Month } from './months.entity';
import { Profile } from './profiles.entity';

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

  @OneToMany(() => Month, (month) => month.user)
  month: Month[];

  @OneToMany((type) => Year, (year) => year.id)
  year: Year[];
}
