import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Product } from './product.entity';

@Entity('Categories')
export class Category {
  @PrimaryGeneratedColumn({ name: 'category_id' })
  id: number;

  @Column({ name: 'category_name', type: 'varchar', length: 255, unique: true, nullable: false })
  name: string;

  // @OneToMany(() => Product, (product) => product.category)
  // products: Product[];
}