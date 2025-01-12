import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './book.model';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { AuthGuard } from '@nestjs/passport';

@Controller('book')
export class BookController {
  constructor(private bookService: BookService) {}

  @Get()
  async getAllBooks(@Query() query: ExpressQuery): Promise<Book[]> {
    return this.bookService.findAll(query);
  }

  @Post()
  @UseGuards(AuthGuard())
  async createNewBook(@Body() book: CreateBookDto, @Req() req): Promise<Book> {
    console.log('🚀 ~ BookController ~ createNewBook ~ req:', req);
    return this.bookService.create(book, req.user);
  }

  @Get(':id')
  async getBookById(@Param('id') id: string) {
    return this.bookService.findOne(id);
  }

  @Put(':id')
  async getBookAndUpdate(@Param('id') id: string, @Body() book: UpdateBookDto) {
    return this.bookService.updateBook(id, book);
  }

  @Delete(':id')
  async deleteBook(@Param('id') id: string) {
    return this.bookService.deleteBook(id);
  }
}
