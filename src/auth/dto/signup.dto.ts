import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Please Enter a valid email' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;
}
