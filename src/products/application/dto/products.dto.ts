import { IsNotEmpty, IsString } from 'class-validator';

export class ProductsDto {
  @IsString()
  @IsNotEmpty()
  documentType: string;

  @IsString()
  @IsNotEmpty()
  documentNumber: string;

  @IsString()
  @IsNotEmpty()
  nameProduct: string;

  @IsString()
  @IsNotEmpty()
  typeProduct: string;

  @IsString()
  @IsNotEmpty()
  status: string;
}
