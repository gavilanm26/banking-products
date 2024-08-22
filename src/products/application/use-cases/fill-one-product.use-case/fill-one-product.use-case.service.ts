import { Injectable } from '@nestjs/common';
import { ProductsService } from '../../../domain/service/products.service';
import { ProductEntity } from '../../../domain/entities/product.entity';

@Injectable()
export class FillOneProductUseCaseService {
  constructor(private readonly productsService: ProductsService) {}

  async execute(
    query: Partial<{ customerKey: string; _id: string }>,
    token: string,
  ): Promise<ProductEntity> {
    return this.productsService.findBycustomerKey(query, token);
  }
}
