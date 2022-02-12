import { ParseUUIDPipe } from '@nestjs/common';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';

export class updateQuoteDTO {
  @IsNotEmpty()
  @IsUUID()
  weekId: ParseUUIDPipe;

  @IsNotEmpty()
  @IsBoolean()
  isCancel: boolean;
}
