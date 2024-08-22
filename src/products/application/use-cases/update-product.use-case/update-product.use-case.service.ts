import { Injectable } from '@nestjs/common';
import { ProductsService } from '../../../domain/service/products.service';
import { UpdateProductDto } from '../../dto/updateProducts.dto';
import { ProductEntity } from '../../../domain/entities/product.entity';

@Injectable()
export class UpdateProductUseCaseService {
  constructor(private readonly productsService: ProductsService) {}

  async execute(
    customerKey: string,
    UpdateProductDto: UpdateProductDto,
    token: string,
  ): Promise<ProductEntity> {
    return this.productsService.update(customerKey, UpdateProductDto, token);
  }
}
