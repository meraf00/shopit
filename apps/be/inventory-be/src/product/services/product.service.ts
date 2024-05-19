import { Injectable } from '@nestjs/common';
import { EntityCrudService } from '@shared/services';
import { Product } from '../entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';

@Injectable()
export class ProductService extends EntityCrudService<
  Product,
  CreateProductDto,
  UpdateProductDto
> {
  constructor(@InjectRepository(Product) repository: Repository<Product>) {
    super(repository);
  }
}
