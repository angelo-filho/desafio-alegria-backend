import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('seeds')
export class Seed {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'varchar',
    length: '150',
    nullable: false,
    unique: true,
  })
  name: string;
}
