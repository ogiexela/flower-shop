import {
  Column,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('flower')
export class FlowerEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @PrimaryColumn()
  sku: string;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100 })
  image: string;

  @Column('float')
  price: number;

  @Column('int', { default: 0 })
  rating: number;
}