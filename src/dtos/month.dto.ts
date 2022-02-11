import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class MonthDTO {
  @IsNotEmpty()
  @IsNumber()
  finalMonth: number;

  @IsNotEmpty()
  @IsNumber()
  initialMonth: number;

  @IsNotEmpty()
  @IsString()
  year: string;

  @IsNotEmpty()
  @IsNumber()
  totalSaving: number;

  @IsNotEmpty()
  @IsString()
  description: string;
}
