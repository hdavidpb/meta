import {
  BadRequestException,
  Injectable,
  NotFoundException,
  ParseUUIDPipe,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';

import { MonthDTO } from 'src/dtos/month.dto';
import { updateQuoteDTO } from 'src/dtos/updateQuote.dto';
import { yearDTO } from 'src/dtos/year.dto';
import { Year } from 'src/entities';
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

  async createMonths(userId: any, createData: MonthDTO) {
    console.log(userId);

    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user) throw new NotFoundException('user not found');
    const isYear = await this.yearRepository.findOne({
      where: {
        user: user,
      },
    });
    // if (isYear)
    //   throw new BadRequestException('This user almost have this year');
    const yearInstance = await this.yearRepository.create({
      year: createData.year,
      user: user,
      description: createData.description,
    });
    const yearSaved = await this.yearRepository.save(yearInstance);
    const weekQuote = createData.totalSaving / createData.finalMonth / 4;
    for (let i = createData.initialMonth; i <= createData.finalMonth; i++) {
      const monthInsatance = await this.monthRepository.create({
        user,
        monthName: month[i - 1],
        monthNumber: i,
        year: yearSaved,
      });
      const monthSaved = await this.monthRepository.save(monthInsatance);
      for (let i = 1; i <= 4; i++) {
        const weekInstance = await this.weekRepository.create({
          weekName: `Semana ${i}`,
          month: monthSaved,
          quotePrice: Math.round(weekQuote),
        });
        const weekSave = await this.weekRepository.save(weekInstance);
      }
    }
    const allYear = await this.yearRepository.find({
      where: {
        user: user,
      },
    });
    const alltMonths = await this.monthRepository.find({
      where: {
        year: yearSaved,
      },
      relations: ['weeks'],
    });
    return alltMonths;
  }

  async getAllYearsFromUserId(id: string) {
    const user = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!user) throw new NotFoundException('user do not exist');

    const yearInstance = await this.yearRepository.find({
      user: user,
    });

    return yearInstance;
  }

  async getAllMonthAndWeeksforAYear(userID: string, yearID: ParseUUIDPipe) {
    console.log(yearID);
    const user = await this.userRepository.findOne({
      where: {
        id: userID,
      },
    });
    const yearInstance = await this.yearRepository.findOne({
      where: {
        id: yearID,
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
      year: yearInstance.year,
      description: yearInstance.description,
      month: monthInstance,
    };
    return res;
  }

  async deleteSaving(yearId: string) {
    const yearInstance = await this.yearRepository.findOne({
      where: { id: yearId },
    });
    if (!yearInstance) throw new NotFoundException('Saving do no exist');

    const monthsInstance = await this.monthRepository.find({
      where: {
        year: yearInstance,
      },
    });

    for (let month of monthsInstance) {
      const weekInstance = await this.weekRepository.find({
        where: {
          month: month,
        },
      });

      for (let week of weekInstance) {
        await this.weekRepository.delete(week.id);
      }

      const deleteMonth = await this.monthRepository.delete(month.id);
      console.log('=====> Mes eliminado', deleteMonth);
    }
    const deleteYear = await this.yearRepository.delete(yearInstance.id);
    console.log('Año eliminado=====>', deleteYear);
    return yearInstance;
  }

  async updateQuotes(updateQuote: updateQuoteDTO[]) {
    let updatedWeeks = [];
    for (let i = 0; i < updateQuote.length; i++) {
      const weekInstance = await this.weekRepository.findOne({
        where: {
          id: updateQuote[i].weekId,
        },
      });
      if (!weekInstance) throw new NotFoundException('Week dont exist!');

      const updateIsCancelWeek = await this.weekRepository.save({
        ...weekInstance,
        isCancel: updateQuote[i].isCancel,
      });
      updatedWeeks.push(updateIsCancelWeek);
    }

    return updatedWeeks;
  }
}
