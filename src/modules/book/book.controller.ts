import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { IBookDTO } from './book.dto';
import { BookService } from './book.service';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  async create(@Body() data: IBookDTO) {
    return this.bookService.create(data);
  }

  @Get()
  async findAll() {
    return this.bookService.findAll();
  }

  @Put(':bookId')
  async updateBook(@Param('bookId') bookId: string, @Body() data: IBookDTO) {
    return this.bookService.updateBook(bookId, data);
  }

  @Delete(':bookId')
  async deleteBook(@Param('bookId') bookId: string) {
    return this.bookService.deleteBook(bookId);
  }
}
