import { DataSource } from 'typeorm';
import { readFile } from 'fs/promises';
import { Book } from '../modules/books/entities/book.entity';
import { Chapter } from '../modules/chapters/entities/chapter.entity';
import { Block } from '../modules/blocks/entities/block.entity';
import Seeder from '../lib/typeorm/seeder';

interface BookData {
  title: string;
  chaptersCount: number;
}

export default class BookSeeder extends Seeder {
  protected name = 'book-seeder';
  track = false;
  private BOOKS_PATH = '/../data/books.data.json';

  public async execute(dataSource: DataSource): Promise<void> {
    const booksJSON = await readFile(__dirname + this.BOOKS_PATH);
    const booksData = JSON.parse(String(booksJSON)) as BookData[];

    const books = booksData.map((bookData) => {
      const chapters = Array.from({ length: bookData.chaptersCount }).map(
        (_, i) => ({
          number: i + 1,
        }),
      );

      return {
        title: bookData.title,
        chapters,
      };
    });

    const booksRepository = dataSource.getRepository(Book);
    const chaptersRepository = dataSource.getRepository(Chapter);

    await booksRepository.save(books);

    const chapters = await chaptersRepository.find({
      relations: { book: true },
    });

    const blocks = [];

    for (let i = 0; i < chapters.length; i += 5) {
      const block = {};
      const currentChapters = chapters.slice(i, i + 5);

      block['title'] =
        `${currentChapters[0].book.title} ${currentChapters[0].number} - ${currentChapters.at(-1).book.title} ${currentChapters.at(-1).number}`;

      block['chapters'] = currentChapters;

      blocks.push(block);
    }

    const blockRepository = dataSource.getRepository(Block);

    await blockRepository.save(blocks);
  }
}
