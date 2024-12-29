import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './book.model';
import { Query } from 'express-serve-static-core';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name)
    private bookModel: mongoose.Model<Book>,
  ) {}

  async findAll(query: Query): Promise<Book[]> {
    const resultPerPage = Number(query.limit);
    const currPage = Number(query.page) ?? 1;
    const skip = resultPerPage * (currPage - 1);

    const search = query.search
      ? {
          title: {
            $regex: query.search,
            $options: 'i', //case insensitive
          },
        }
      : {};

    const books = await this.bookModel
      .find({ ...search })
      .limit(resultPerPage)
      .skip(skip);
    return books;
  }

  async create(book: Book): Promise<Book> {
    const res = await this.bookModel.create(book);
    return res;
  }

  async findOne(id: string): Promise<Book> {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) throw new BadRequestException('Not a valid Id');

    const book = await this.bookModel.findById(id);

    if (!book) {
      throw new NotFoundException('No Book Found :(');
    }

    return book;
  }

  async updateBook(id: string, book: Book): Promise<Book> {
    return await this.bookModel.findByIdAndUpdate(id, book, {
      new: true,
      runValidators: true,
    });
  }

  async deleteBook(id: string): Promise<Book> {
    return await this.bookModel.findByIdAndDelete(id);
  }
}
