import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { IBookDTO } from './book.dto';

@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) {}

  async create(data: IBookDTO) {
    const bookExists = await this.prisma.book.findFirst({
      where: {
        bar_code: data.bar_code,
      },
    });

    if (bookExists) throw new Error('Book already exists');

    const book = await this.prisma.book.create({
      data,
    });

    return book;
  }

  async findAll() {
    return this.prisma.book.findMany();
  }

  async updateBook(id: string, data: IBookDTO) {
    const bookExists = await this.prisma.book.findUnique({
      where: {
        id,
      },
    });

    if (!bookExists) throw new Error('Book not found');

    const book = await this.prisma.book.update({
      data,
      where: {
        id,
      },
    });

    return book;
  }

  async deleteBook(id: string) {
    const bookExists = await this.prisma.book.findUnique({
      where: {
        id,
      },
    });

    if (!bookExists) throw new Error('Book not found');

    return await this.prisma.book.delete({
      where: {
        id,
      },
    });
  }
}
