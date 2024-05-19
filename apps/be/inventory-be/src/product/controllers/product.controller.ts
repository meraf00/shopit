import { Controller } from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { EntityCrudController } from '@shared/controllers';
import { Product } from '../entities/product.entity';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';

@Controller('products')
export class ProductController extends EntityCrudController<
  Product,
  CreateProductDto,
  UpdateProductDto
>({
  createDto: CreateProductDto,
  updateDto: UpdateProductDto,
}) {
  constructor(private readonly productService: ProductService) {
    super(productService);
  }
}
