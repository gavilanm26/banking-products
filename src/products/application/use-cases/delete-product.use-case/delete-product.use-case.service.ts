import { Injectable } from '@nestjs/common';
import { ProductsService } from '../../../domain/service/products.service';

@Injectable()
export class DeleteProductUseCaseService {
  constructor(private readonly productsService: ProductsService) {}

  async execute(
    customerKey: string,
    token: string,
  ): Promise<{ deleted: boolean; message?: string }> {
    const result = await this.productsService.delete(customerKey, token);
    return { deleted: result.delete, message: result.message };
  }
}
