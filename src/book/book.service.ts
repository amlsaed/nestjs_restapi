import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Book } from './schema/book.schema';
import * as mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateBookDto } from './Dtos/createBook.dto';
import {Query} from 'express-serve-static-core'

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name)
    private bookModel: mongoose.Model<Book>,
  ) {}

  async findAll(query:Query): Promise<Book[]> {
    const resPerpage = 2
    const currentPage = Number(query.page) || 1
    const skip = resPerpage * (currentPage -1)
    const keyword = query.keyword?{
      title:{
        $regex:query.keyword,
        $options:"i"
      }
    }:{}

    const books = await this.bookModel.find({...keyword}).limit(currentPage).skip(skip);
    return books;
  }

  async create(book: Book): Promise<Book> {
    const newBook = await this.bookModel.create(book);
    return newBook;
  }

  async findBookById(id: string): Promise<Book> {
    const book = await this.bookModel.findById(id);
    if(!book){
        throw new NotFoundException("Book not found")
    }

    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException('Please enter correct id.');
    }
    return book
  }

  async updateBook(id: string,book:Book): Promise<Book> {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException('Please enter correct id.');
    }
    return await this.bookModel.findByIdAndUpdate(id,book);
  }

  async deleteBook(id: string): Promise<void> {
    return await this.bookModel.findByIdAndDelete(id);
  }
}
