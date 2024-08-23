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
    const productE = ProductEntity.create(
      productsDto.documentType,
      productsDto.documentNumber,
      productsDto.loanAmount,
      productsDto.loanTerm,
      productsDto.interestRate,
      productsDto.status,
      customerKey,
      productsDto.productName, // Nombre del producto
    );

    return await this.productsService.create(productE, token);
  }
}
