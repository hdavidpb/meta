import { IsArray, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class yearDTO {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  yearNumber: string;
}
