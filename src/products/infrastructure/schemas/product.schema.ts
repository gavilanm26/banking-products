import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Product extends Document {
  @Prop({ required: true })
  documentType: string;

  @Prop({
    required: true,
  })
  documentNumber: string;

  @Prop({
    required: true,
  })
  nameProduct: string;

  @Prop({ required: true })
  typeProduct: string;

  @Prop({
    required: true,
  })
  customerKey: string;

  @Prop({ required: true })
  status: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
