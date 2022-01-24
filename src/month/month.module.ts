import { Module } from '@nestjs/common';

import { MonthController } from '../month/month.controller';
import { monthRepository } from '../repositories/month.repository';
import { weekRepository } from '../repositories/week.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MonthService } from '../month/month.service';
import { UserRepository } from 'src/repositories/user.repository';
import { yearRepository } from 'src/repositories/year.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      monthRepository,
      weekRepository,
      UserRepository,
      yearRepository,
    ]),
  ],
  providers: [MonthService],
  controllers: [MonthController],
})
export class MonthModule {}
