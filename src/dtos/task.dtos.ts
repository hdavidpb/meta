import { IsBoolean, IsNotEmpty, IsString, IsEmpty } from 'class-validator';

export class taskDTO {
  @IsNotEmpty()
  @IsString()
  description: string;
}

export class taskUpdateDTO {
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsBoolean()
  isChecked: boolean;
}
