import { Injectable } from '@nestjs/common';
import { BaseCrudService } from '@shared/services';
import { Product } from '../entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService extends BaseCrudService<Product> {
  constructor(@InjectRepository(Product) repository: Repository<Product>) {
    super(repository);
  }
}
