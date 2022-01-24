import { Body, Controller, Get, Post } from '@nestjs/common';
import { MonthDTO } from 'src/dtos/month.dto';
import { yearDTO } from 'src/dtos/year.dto';
import { MonthService } from './month.service';

@Controller('api/month')
export class MonthController {
  constructor(readonly monthService: MonthService) {}

  @Post('create')
  createMonths(@Body() monthData: MonthDTO) {
    return this.monthService.createMonths(monthData);
  }

  @Post('quotes')
  getAllQuotes(@Body() yearData: yearDTO) {
    return this.monthService.getAllMonthAndWeeksforAYear(yearData);
  }
}
