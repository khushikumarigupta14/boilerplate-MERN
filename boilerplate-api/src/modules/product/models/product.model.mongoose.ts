import mongoose, { Schema, Document } from 'mongoose';
import { IProduct } from '../product.interface';

export interface IProductDoc extends IProduct, Document {}

const ProductSchema = new Schema<IProductDoc>(
  {
    name: { type: String, required: true },
  },
  { timestamps: true },
);

export const ProductModel = mongoose.model<IProductDoc>('Product', ProductSchema);
