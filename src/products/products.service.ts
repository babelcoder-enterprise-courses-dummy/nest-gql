import { Injectable } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
  findAll(): Product[] {
    return [
      { id: 1, name: 'Product#1', desc: 'Product Desc#1' },
      { id: 2, name: 'Product#2', desc: 'Product Desc#2' },
      { id: 3, name: 'Product#3', desc: 'Product Desc#3' },
    ];
  }
}
