import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class MonthDTO {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsNumber()
  quantityOfMonths: number;

  @IsNotEmpty()
  @IsString()
  year: string;

  @IsNotEmpty()
  @IsNumber()
  totalSaving: number;
}
