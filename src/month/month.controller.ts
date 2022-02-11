import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  ParseUUIDPipe,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { MonthDTO } from 'src/dtos/month.dto';
import { yearDTO } from 'src/dtos/year.dto';
import { MonthService } from './month.service';

@ApiTags('Savings')
@Controller('api/saving')
export class MonthController {
  constructor(readonly monthService: MonthService) {}

  @Post('create')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async createMonths(@Request() res: any, @Body() monthData: MonthDTO) {
    // @Headers('Authorization') authorization: string,
    return await this.monthService.createMonths(res.user.id, monthData);
  }

  @Post('quotes')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  getAllQuotes(@Body() yearData: yearDTO) {
    return this.monthService.getAllMonthAndWeeksforAYear(yearData);
  }

  @Get('years')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async getAllYearsFromUserId(@Request() res: any) {
    return {
      years: await this.monthService.getAllYearsFromUserId(res.user.id),
    };
  }

  @Delete('saving/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async deleteSaving(@Param('id', ParseUUIDPipe) id: string) {
    return await this.monthService.deleteSaving(id);
  }
}
