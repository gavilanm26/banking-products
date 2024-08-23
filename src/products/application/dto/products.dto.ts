import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class ProductsDto {
  @IsNotEmpty()
  @IsString()
  documentType: string;

  @IsNotEmpty()
  @IsString()
  documentNumber: string;

  @IsNotEmpty()
  @IsNumber()
  loanAmount: number;

  @IsNotEmpty()
  @IsString()
  loanTerm: string;

  @IsNotEmpty()
  @IsString()
  interestRate: string;

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsNotEmpty()
  @IsString()
  productName: string;
}
