import {
  IsEmpty,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Category } from '../book.enum';
import { User } from 'src/auth/auth.model';

export class UpdateBookDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  author: string;

  @IsOptional()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsEnum(Category, { message: 'Please provide a valid category' })
  category: Category;

  @IsEmpty({ message: 'You should not pass user' })
  user: User;
}
