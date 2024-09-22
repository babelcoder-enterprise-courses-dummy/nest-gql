import { Injectable } from '@nestjs/common';
import { Product } from './product.model';
import { GetProductsArgs } from './dto/get-products.args';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';

@Injectable()
export class ProductsService {
  products: Product[] = [];

  findAll(params?: GetProductsArgs): Product[] {
    if (!params) return this.products;

    const { page, limit } = params;
    const startIndex = (page - 1) * limit;

    return this.products.slice(startIndex, startIndex + limit);
  }

  findById(id: number) {
    return this.products.find((p) => p.id === id);
  }

  create(product: CreateProductInput) {
    const createdProduct = {
      id: this.products.length + 1,
      ...product,
    };

    this.products.push(createdProduct);

    return createdProduct;
  }

  update(product: UpdateProductInput) {
    const existingProduct = this.products.find((p) => p.id === product.id);

    if (product.name) existingProduct.name = product.name;
    if (product.desc) existingProduct.desc = product.desc;

    return existingProduct;
  }

  remove(id: number) {
    const existingProductIndex = this.products.findIndex((p) => p.id === id);

    this.products.splice(existingProductIndex, 1);
  }
}
