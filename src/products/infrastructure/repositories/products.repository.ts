import { Injectable, Logger } from '@nestjs/common';
import { ProductsInterface } from '../../domain/interface/products.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Product as ProductSchema } from '../schemas/product.schema';
import { Model } from 'mongoose';
import { ProductEntity } from '../../domain/entities/product.entity';

@Injectable()
export class ProductsRepository implements ProductsInterface {
  private readonly logger = new Logger(ProductsRepository.name);

  constructor(
    @InjectModel(ProductSchema.name)
    private readonly productModel: Model<ProductSchema>,
  ) {}

  async create(productE: ProductEntity): Promise<ProductEntity> {
    return await new this.productModel(productE)
      .save()
      .then((savedProduct) => {
        this.logger.log(
          `(SAVE) Product created: ${JSON.stringify(savedProduct)}`,
        );
        return savedProduct;
      })
      .catch((error) => {
        this.logger.error(
          `(SAVE FAILED) Error creating product: ${productE.productName}`,
          error.stack,
        );
        throw error;
      });
  }

  async findAll(): Promise<ProductEntity[]> {
    return this.productModel
      .find()
      .exec()
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
  ): Promise<ProductEntity | null> {
    const criteria = query._id
      ? { _id: query._id }
      : { customerKey: query.customerKey };
    return this.productModel
      .findOne(criteria)
      .exec()
      .then((product) => {
        if (product) {
          this.logger.log(
            query._id
              ? `(FIND BY ID) Product found: ${JSON.stringify(product)}`
              : `(FIND BY CUSTOMER KEY) Product found: ${JSON.stringify(product)}`,
          );
          return product;
        }
      })
      .catch((error) => {
        this.logger.error(
          query._id
            ? `(FIND BY ID FAILED) Error finding product: ${query._id}`
            : `(FIND BY CUSTOMER KEY FAILED) Error finding product: ${query.customerKey}`,
          error.stack,
        );
        throw error;
      });
  }

  async update(
    ProductE: ProductEntity & Document & { _id: string },
  ): Promise<ProductEntity | null> {
    return this.productModel
      .findOneAndUpdate({ _id: ProductE._id }, ProductE, { new: true })
      .exec()
      .then((updatedProduct) => {
        this.logger.log(
          `(UPDATE) Product updated: ${JSON.stringify(updatedProduct)}`,
        );
        return updatedProduct;
      })
      .catch((error) => {
        this.logger.error(
          `(UPDATE FAILED) Error updating product: ${ProductE.productName}`,
          error.stack,
        );
        throw error;
      });
  }

  async delete(customerKey: string): Promise<boolean> {
    return this.productModel
      .deleteOne({ customerKey })
      .exec()
      .then((result: { deletedCount?: number }) => {
        if (result.deletedCount && result.deletedCount > 0) {
          this.logger.log(
            `(DELETE) Product deleted: ${JSON.stringify(result)}`,
          );
          return true;
        }
        return false;
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
