import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Chapter } from '../../chapters/entities/chapter.entity';

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
  })
  title: string;

  @OneToMany(() => Chapter, (chapter) => chapter.book, {
    cascade: true,
  })
  chapters: Chapter[];
}
