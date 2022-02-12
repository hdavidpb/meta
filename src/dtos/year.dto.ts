import { IsArray, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class yearDTO {
  @IsNotEmpty()
  @IsString()
  yearNumber: string;
}
