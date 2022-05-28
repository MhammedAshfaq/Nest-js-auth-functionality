import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto { 
  @IsString()
  @MaxLength(225)
  firstName: string;
 
  @IsString()
  @MaxLength(225)
  lastName: string;
 
  @IsString()
  @IsEmail()
  email: string;
 
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  password: string;
}
