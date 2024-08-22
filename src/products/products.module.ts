import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Product,
  ProductSchema,
} from './infrastructure/schemas/product.schema';
import { ProductsRepository } from './infrastructure/repositories/products.repository';
import { ProductsService } from './domain/service/products.service';
import { CreateProductUseCaseService } from './application/use-cases/create-product.use-case/create-product.use-case.service';
import { DeleteProductUseCaseService } from './application/use-cases/delete-product.use-case/delete-product.use-case.service';
import { FillAllProductUseCaseService } from './application/use-cases/fill-all-product.use-case/fill-all-product.use-case.service';
import { FillOneProductUseCaseService } from './application/use-cases/fill-one-product.use-case/fill-one-product.use-case.service';
import { UpdateProductUseCaseService } from './application/use-cases/update-product.use-case/update-product.use-case.service';
import { ProductsController } from './infrastructure/controllers/products.controller';
import { OauthService } from './domain/service/oauth/oauth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './utils/jwt.strategy';
import { EncryptionService } from './domain/service/encryptation/encryption.service';
import { TokenValidationService } from './utils/token-validation/token-validation.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    JwtModule.register({
      secret: 'pruebaTecnicaJWT',
      signOptions: { expiresIn: '4m' },
    }),
  ],
  controllers: [ProductsController],
  providers: [
    {
      provide: 'ProductsInterface',
      useClass: ProductsRepository,
    },
    ProductsService,
    CreateProductUseCaseService,
    DeleteProductUseCaseService,
    FillAllProductUseCaseService,
    FillOneProductUseCaseService,
    UpdateProductUseCaseService,
    OauthService,
    JwtStrategy,
    EncryptionService,
    TokenValidationService,
  ],
})
export class ProductsModule {}
