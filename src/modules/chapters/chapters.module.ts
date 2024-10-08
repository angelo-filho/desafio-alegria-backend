import { Module } from '@nestjs/common';
import { ChaptersService } from './chapters.service';
import { ChaptersController } from './chapters.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chapter } from './entities/chapter.entity';
import { Book } from '../books/entities/book.entity';
import { Block } from '../blocks/entities/block.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Chapter, Book, Block])],
  controllers: [ChaptersController],
  providers: [ChaptersService],
})
export class ChaptersModule {}
