import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MaxLength(150)
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @MaxLength(150)
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @MaxLength(150)
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @MaxLength(65)
  @IsNotEmpty()
  password: string;
}
