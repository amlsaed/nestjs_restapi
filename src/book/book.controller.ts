import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './schema/book.schema';
import { CreateBookDto } from './Dtos/createBook.dto';
import { UpdateBookDto } from './Dtos/updateBookDto.dto';
import { Query as ExpressQuery } from 'express-serve-static-core';


@Controller('books')
export class BookController {
    constructor(
        private bookService:BookService
    ){}

    @Get()
    async findAllBooks(@Query()query:ExpressQuery):Promise<Book[]>{
        const books = await this.bookService.findAll(query)
        return books
    }

    @Post("new")
    async createNewBook(@Body()book:CreateBookDto):Promise<Book>{
        const newBook = await this.bookService.create(book)
        return newBook
    }

    @Get(":id")
    async findBook(@Param("id")id:string):Promise<Book>{
        return await this.bookService.findBookById(id)
    }

    @Put(":id")
    async updateBook(@Param("id")id:string,@Body()book:UpdateBookDto){
        return this.bookService.updateBook(id,book)
    }


    @Delete(":id")
    async deleteBook(@Param('id')id:string){
        return this.bookService.deleteBook(id)
    }



}
