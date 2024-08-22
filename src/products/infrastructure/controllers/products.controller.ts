import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateProductUseCaseService } from '../../../products/application/use-cases/create-product.use-case/create-product.use-case.service';
import { DeleteProductUseCaseService } from '../../../products/application/use-cases/delete-product.use-case/delete-product.use-case.service';
import { FillAllProductUseCaseService } from '../../../products/application/use-cases/fill-all-product.use-case/fill-all-product.use-case.service';
import { FillOneProductUseCaseService } from '../../../products/application/use-cases/fill-one-product.use-case/fill-one-product.use-case.service';
import { UpdateProductUseCaseService } from '../../../products/application/use-cases/update-product.use-case/update-product.use-case.service';
import { ProductsDto } from '../../application/dto/products.dto';
import { ProductEntity } from '../../../products/domain/entities/product.entity';
import { isValidObjectId } from 'mongoose';
import { UpdateProductDto } from '../../application/dto/updateProducts.dto';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly createProductUseCaseService: CreateProductUseCaseService,
    private readonly deleteProductUseCaseService: DeleteProductUseCaseService,
    private readonly fillAllProductUseCaseService: FillAllProductUseCaseService,
    private readonly fillOneProductUseCaseService: FillOneProductUseCaseService,
    private readonly updateProductUseCaseService: UpdateProductUseCaseService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createProduct(
    @Body() productsDto: ProductsDto,
    @Headers('authorization') authHeader: string,
  ): Promise<any> {
    const token = authHeader.split(' ')[1];
    await this.createProductUseCaseService.execute(productsDto, token);
    return { message: 'Product created' };
  }

  @UseGuards(JwtAuthGuard)
  @Get('all')
  async findAllProducts(
    @Headers('authorization') authHeader: string,
  ): Promise<ProductEntity[]> {
    const token = authHeader.split(' ')[1];
    return await this.fillAllProductUseCaseService.execute(token);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':customerkey')
  async findOneProduct(
    @Param('customerkey') customerKey: string,
    @Headers('authorization') authHeader: string,
  ): Promise<ProductEntity> {
    const token = authHeader.split(' ')[1];
    const query = isValidObjectId(customerKey)
      ? { _id: customerKey }
      : { customerKey };
    return await this.fillOneProductUseCaseService.execute(query, token);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':customerkey')
  async updateProduct(
    @Param('customerkey') customerKey: string,
    @Body() updateProductDto: UpdateProductDto,
    @Headers('authorization') authHeader: string,
  ): Promise<ProductEntity> {
    const token = authHeader.split(' ')[1];
    return await this.updateProductUseCaseService.execute(
      customerKey,
      updateProductDto,
      token,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':customerKey')
  async deleteProduct(
    @Param('customerKey') customerKey: string,
    @Headers('authorization') authHeader: string,
  ): Promise<{ deleted: boolean; message?: string }> {
    const token = authHeader.split(' ')[1];
    const result = await this.deleteProductUseCaseService.execute(
      customerKey,
      token,
    );

    if (!result.deleted) {
      throw new BadRequestException(result.message);
    }
    return result;
  }
}
