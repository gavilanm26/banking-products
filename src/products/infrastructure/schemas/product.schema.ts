import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Product extends Document {
  @Prop({ required: true })
  documentType: string;

  @Prop({ required: true })
  documentNumber: string;

  @Prop({ required: true })
  loanAmount: number;

  @Prop({ required: true })
  loanTerm: string;

  @Prop({ required: true })
  interestRate: string;

  @Prop({ required: true })
  status: string;

  @Prop({ required: true })
  customerKey: string;

  @Prop({ required: true })
  productName: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
