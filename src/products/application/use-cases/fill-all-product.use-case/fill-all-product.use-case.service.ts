import { Injectable } from '@nestjs/common';
import { ProductEntity } from '../../../domain/entities/product.entity';
import { ProductsService } from '../../../domain/service/products.service';

@Injectable()
export class FillAllProductUseCaseService {
  constructor(private readonly productsService: ProductsService) {}

  async execute(token: string): Promise<ProductEntity[]> {
    return this.productsService.findAll(token);
  }
}
