import { Column, Entity, ObjectIdColumn, ObjectId } from 'typeorm';
import { BaseEntity } from '@shared/entity';

@Entity({ name: 'products' })
export class Product extends BaseEntity {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  imageUrl: string;

  @Column()
  stock: number;
}
