import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ProductsInterface } from '../interface/products.interface';
import { ProductEntity } from '../entities/product.entity';
import { UpdateProductDto } from '../../application/dto/updateProducts.dto';
import { TokenValidationService } from '../../utils/token-validation/token-validation.service';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);

  constructor(
    @Inject('ProductsInterface')
    private readonly productsInterface: ProductsInterface,
    private readonly tokenValidationService: TokenValidationService,
  ) {}

  async create(productE: ProductEntity, token: string): Promise<ProductEntity> {
    const user = await this.tokenValidationService.getUserFromToken(token);
    const customerKey = `${productE.documentType}${productE.documentNumber}`;

    if (user.customerKey !== customerKey) {
      throw new UnauthorizedException('Unauthorized');
    }

    return await this.productsInterface
      .create(productE)
      .then((productSaved) => {
        this.logger.log(
          `(SAVE) Product created: ${JSON.stringify(productSaved)}`,
        );
        return productSaved;
      })
      .catch((error) => {
        this.logger.error(
          `(SAVE FAILED) Error creating product: ${productE.productName}`,
          error.stack,
        );
        throw error;
      });
  }

  async findAll(token: string): Promise<ProductEntity[]> {
    this.tokenValidationService.getUserFromToken(token);
    return this.productsInterface
      .findAll()
      .then((products) => {
        this.logger.log(
          `(FIND ALL) Products found: ${JSON.stringify(products)}`,
        );
        return products;
      })
      .catch((error) => {
        this.logger.error(
          `(FIND ALL FAILED) Error finding products`,
          error.stack,
        );
        throw error;
      });
  }

  async findBycustomerKey(
    query: Partial<{ customerKey: string; _id: string }>,
    token: string,
  ): Promise<ProductEntity | null> {
    this.tokenValidationService.getUserFromToken(token);
    return this.productsInterface
      .findBycustomerKey(query)
      .then((product) => {
        if (product) {
          this.logger.log(
            query._id
              ? `(FIND BY ID) Product found: ${JSON.stringify(product)}`
              : `(FIND BY CUSTOMER KEY) Product found: ${JSON.stringify(product)}`,
          );
          return product;
        } else {
          this.logger.log(
            query._id
              ? `(FIND BY ID) Product not found: ${query._id}`
              : `(FIND BY CUSTOMER KEY) Product not found: ${query.customerKey}`,
          );
          throw new BadRequestException(
            query._id
              ? `Product with id ${query._id} not found`
              : `Product with customerKey ${query.customerKey} not found`,
          );
        }
      })
      .catch((error) => {
        this.logger.error(
          `(FIND BY CUSTOMER KEY FAILED) Error finding product`,
          error.stack,
        );
        throw error;
      });
  }

  async update(
    customerKey: string,
    updateProductDto: UpdateProductDto,
    token: string,
  ): Promise<ProductEntity | null> {
    this.tokenValidationService.getUserFromToken(token);
    const existingProduct = await this.productsInterface.findBycustomerKey({
      customerKey: customerKey,
    });

    if (!existingProduct) {
      throw new BadRequestException(
        `Product with customerKey ${customerKey} not found`,
      );
    }

    Object.assign(existingProduct, updateProductDto);

    return this.productsInterface
      .update(existingProduct)
      .then((updateProduct) => {
        this.logger.log(
          `(UPDATE) Product updated: ${JSON.stringify(updateProduct)} successfully`,
        );
        return updateProduct;
      })
      .catch((error) => {
        this.logger.error(
          `(UPDATE FAILED) Error updating product: ${customerKey}`,
          error.stack,
        );
        throw error;
      });
  }

  async delete(
    customerKey: string,
    token: string,
  ): Promise<{ delete: boolean; message?: string }> {
    this.tokenValidationService.getUserFromToken(token);
    return this.productsInterface
      .delete(customerKey)
      .then((result) => {
        if (result) {
          this.logger.log(`(DELETE) Product deleted: ${customerKey}`);
          return { delete: true };
        } else {
          this.logger.log(`(DELETE) Product not found: ${customerKey}`);
          return {
            delete: false,
            message: `Product not found: ${customerKey}`,
          };
        }
      })
      .catch((error) => {
        this.logger.error(
          `(DELETE FAILED) Error deleting product: ${customerKey}`,
          error.stack,
        );
        throw error;
      });
  }
}
