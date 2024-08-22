import { Injectable } from '@nestjs/common';
import { ProductsService } from '../../../domain/service/products.service';
import { ProductEntity } from '../../../domain/entities/product.entity';
import { ProductsDto } from '../../dto/products.dto';

@Injectable()
export class CreateProductUseCaseService {
  constructor(private readonly productsService: ProductsService) {}

  async execute(
    productsDto: ProductsDto,
    token: string,
  ): Promise<ProductEntity> {
    const customerKey = productsDto.documentType + productsDto.documentNumber;
    const productE = new ProductEntity(
      productsDto.documentType,
      productsDto.documentNumber,
      productsDto.nameProduct,
      productsDto.typeProduct,
      customerKey,
      productsDto.status,
    );

    return await this.productsService.create(productE, token);
  }
}
