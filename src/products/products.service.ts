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
        name: `Product Name #1`,
        desc: `Product Desc #1`,
      });
    }
  }

  findAll({ page, limit }: GetProductsArgs): Product[] {
    const startIndex = (page - 1) * limit;

    return this.products.slice(startIndex, startIndex + limit);
  }

  findById(id: number) {
    return this.products.find((p) => p.id === id);
  }
}
