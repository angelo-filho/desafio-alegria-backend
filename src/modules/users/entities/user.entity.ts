import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Groups } from '../types/groups.enum';
import { Block } from '../../blocks/entities/block.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 150,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 150,
  })
  password: string;

  @Column({
    type: 'enum',
    enum: Groups,
  })
  group: Groups;

  @OneToMany(() => Block, (blocks) => blocks.user)
  blocks: Block[];
}
