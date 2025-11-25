import { ProductRepository } from './repositories/product.repository.mongoose';

class ProductService {
  private repository: ProductRepository;

  constructor() {
    this.repository = new ProductRepository();
  }

  async create(data: any) {
    return await this.repository.create(data);
  }

  async findAll() {
    return await this.repository.findMany({});
  }
}

export const productService = new ProductService();
