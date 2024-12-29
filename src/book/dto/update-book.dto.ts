import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Category } from '../book.enum';

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
}
