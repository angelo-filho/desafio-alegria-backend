import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Book } from '../../books/entities/book.entity';
import { Block } from '../../blocks/entities/block.entity';

@Entity('chapters')
export class Chapter {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'int',
  })
  number: number;

  @Column({
    type: 'boolean',
    default: false,
  })
  completed: boolean;

  @ManyToOne(() => Book, (book) => book.chapters)
  @JoinColumn({ name: 'book_id' })
  book: Book;

  @ManyToOne(() => Block, (block) => block.chapters)
  @JoinColumn({ name: 'block_id' })
  block: Block;
}
