import { ProductEntity } from '../entities/product.entity';

export interface ProductsInterface {
  create(ProductE: ProductEntity): Promise<ProductEntity>;
  findAll(): Promise<ProductEntity[]>;
  findBycustomerKey(
    query: Partial<{ customerKey: string; _id: string }>,
  ): Promise<ProductEntity | null>;
  update(productE: ProductEntity): Promise<ProductEntity | null>;
  delete(customerKey: string): Promise<boolean>;
}
