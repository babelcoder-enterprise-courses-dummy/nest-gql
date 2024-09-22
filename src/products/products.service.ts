import { Injectable } from '@nestjs/common';
import { Product } from './product.model';
import { GetProductsArgs } from './dto/get-products.args';

@Injectable()
export class ProductsService {
  products: Product[] = [];

  constructor() {
    for (let i = 1; i <= 100; i++) {
      this.products.push({
        id: i,
        name: `Product Name #${i}`,
        desc: `Product Desc #${i}`,
      });
    }
  }

  findAll(params?: GetProductsArgs): Product[] {
    if (!params) return this.products;

    const { page, limit } = params;
    const startIndex = (page - 1) * limit;

    return this.products.slice(startIndex, startIndex + limit);
  }

  findById(id: number) {
    return this.products.find((p) => p.id === id);
  }
}
