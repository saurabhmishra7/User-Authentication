import { IsString, IsEmail, IsStrongPassword } from 'class-validator';


export class CreateUserDto {
  
  @IsString()
  fullName: string;

  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;

}


export class LoginDetailsDto {
  
  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;

}