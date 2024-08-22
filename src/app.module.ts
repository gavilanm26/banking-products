import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ProductsModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODBURI),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
