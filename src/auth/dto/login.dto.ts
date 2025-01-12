import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LogInDto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please Enter a valid email' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;
}
