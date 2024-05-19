import { Controller } from '@nestjs/common';
import { ProductService } from '../services/product.service';

import { BaseCrudController } from '@shared/controllers';
import { Product } from '../entities/product.entity';

@Controller('products')
export class ProductController extends BaseCrudController<Product> {
  constructor(private readonly productService: ProductService) {
    super(productService);
  }
}
