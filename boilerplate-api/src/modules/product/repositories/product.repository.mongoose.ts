import { IRepository } from '../../../database/repository.interface';
import { IProduct } from '../product.interface';
import { ProductModel } from '../models/product.model.mongoose';

export class ProductRepository implements IRepository<IProduct> {
  async create(data: Partial<IProduct>): Promise<IProduct> {
    const doc = await ProductModel.create(data);
    return doc.toObject();
  }

  async findById(id: string): Promise<IProduct | null> {
    const doc = await ProductModel.findById(id);
    return doc ? doc.toObject() : null;
  }

  async findOne(query: any): Promise<IProduct | null> {
    const doc = await ProductModel.findOne(query);
    return doc ? doc.toObject() : null;
  }

  async findMany(query: any): Promise<IProduct[]> {
    const docs = await ProductModel.find(query);
    return docs.map((d) => d.toObject());
  }

  async update(id: string, data: Partial<IProduct>): Promise<IProduct | null> {
    const doc = await ProductModel.findByIdAndUpdate(id, data, { new: true });
    return doc ? doc.toObject() : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await ProductModel.findByIdAndDelete(id);
    return !!result;
  }

  async count(query: any): Promise<number> {
    return await ProductModel.countDocuments(query);
  }
}
