import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { MonthDTO } from 'src/dtos/month.dto';
import { updateQuoteDTO } from 'src/dtos/updateQuote.dto';
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

  @Post('quotes/:year')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  getAllQuotes(@Param('year') year: ParseUUIDPipe, @Request() res: any) {
    return this.monthService.getAllMonthAndWeeksforAYear(res.user.id, year);
  }

  @Get('years')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async getAllYearsFromUserId(@Request() res: any) {
    return {
      years: await this.monthService.getAllYearsFromUserId(res.user.id),
    };
  }

  @Delete('delete/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async deleteSaving(@Param('id', ParseUUIDPipe) id: string) {
    return await this.monthService.deleteSaving(id);
  }
  @Put('update-is-cancel-quotes')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async updateQuotesByIds(@Body() updateQuote: updateQuoteDTO[]) {
    return await this.monthService.updateQuotes(updateQuote);
  }
}
