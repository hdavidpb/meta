import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { MonthDTO } from 'src/dtos/month.dto';
import { yearDTO } from 'src/dtos/year.dto';
import { MonthService } from './month.service';

@ApiTags('Months')
@Controller('api/month')
export class MonthController {
  constructor(readonly monthService: MonthService) {}

  @Post('create')
  @UseGuards()
  @ApiBearerAuth()
  createMonths(
    @Headers('Authorization') authorization: string,
    // @Body() monthData: MonthDTO,
  ) {
    return this.monthService.createMonths(authorization);
  }

  @Post('quotes')
  getAllQuotes(@Body() yearData: yearDTO) {
    return this.monthService.getAllMonthAndWeeksforAYear(yearData);
  }
}
