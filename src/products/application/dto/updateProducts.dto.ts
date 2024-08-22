import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProductDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  nameProduct?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  typeProduct?: string;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  status?: number;
}
