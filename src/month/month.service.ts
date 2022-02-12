import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { MonthDTO } from 'src/dtos/month.dto';
import { yearDTO } from 'src/dtos/year.dto';
import { monthRepository } from 'src/repositories/month.repository';
import { UserRepository } from 'src/repositories/user.repository';
import { weekRepository } from 'src/repositories/week.repository';
import { yearRepository } from 'src/repositories/year.repository';
import { month } from './const';

@Injectable()
export class MonthService {
  constructor(
    private monthRepository: monthRepository,
    private weekRepository: weekRepository,
    private yearRepository: yearRepository,
    private userRepository: UserRepository,
  ) {}

  async createMonths(token: string /*monthData: MonthDTO*/) {
    console.log(token);
    // const user = await this.userRepository.findOne({
    //   where: { id: monthData.id },
    // });

    // if (!user) throw new NotFoundException('user not found');

    // const isYear = await this.yearRepository.findOne({
    //   where: {
    //     user: user,
    //   },
    // });

    // if (isYear)
    //   throw new BadRequestException('This user almost have this year');

    // const yearInstance = await this.yearRepository.create({
    //   year: monthData.year,
    //   user: user,
    // });
    // const yearSaved = await this.yearRepository.save(yearInstance);

    // const weekQuote = monthData.totalSaving / monthData.quantityOfMonths / 4;

    // for (let i = 1; i <= monthData.quantityOfMonths; i++) {
    //   const monthInsatance = await this.monthRepository.create({
    //     user,
    //     monthName: month[i - 1],
    //     monthNumber: i,
    //     year: yearSaved,
    //   });
    //   const monthSaved = await this.monthRepository.save(monthInsatance);

    //   for (let i = 1; i <= 4; i++) {
    //     const weekInstance = await this.weekRepository.create({
    //       weekName: `Semana ${i}`,
    //       month: monthSaved,
    //       quotePrice: Math.round(weekQuote),
    //     });

    //     const weekSave = await this.weekRepository.save(weekInstance);
    //   }
    // }

    // const allYear = await this.yearRepository.find({
    //   where: {
    //     user: user,
    //   },
    // });

    // const alltMonths = await this.monthRepository.find({
    //   where: {
    //     year: yearSaved,
    //   },
    //   relations: ['weeks'],
    // });

    // return alltMonths;
  }

  async getAllMonthAndWeeksforAYear(yearData: yearDTO) {
    const user = await this.userRepository.findOne({
      where: {
        id: yearData.userId,
      },
    });
    const yearInstance = await this.yearRepository.findOne({
      where: {
        year: yearData.yearNumber,
        user: user,
      },
    });
    const monthInstance = await this.monthRepository.find({
      where: {
        year: yearInstance,
      },
      relations: ['weeks'],
    });
    console.log(yearInstance);
    if (!yearInstance || !user)
      throw new BadRequestException('user or year do not exist');

    const res = {
      year: yearData.yearNumber,
      month: monthInstance,
    };
    return res;
  }
}
