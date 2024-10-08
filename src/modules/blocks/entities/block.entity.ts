import { Chapter } from '../../chapters/entities/chapter.entity';
import { User } from '../../users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('blocks')
export class Block {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
  })
  title: string;

  @OneToMany(() => Chapter, (chapter) => chapter.block, {
    cascade: true,
  })
  chapters: Chapter[];

  @ManyToOne(() => User, (user) => user.blocks)
  @JoinColumn({
    name: 'user_id',
  })
  user: User;
}
