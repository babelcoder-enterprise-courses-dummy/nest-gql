import { Injectable } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { ProductsService } from './products/products.service';
import { shuffle } from 'lodash';

@Injectable()
export class AppService {
  constructor(
    private readonly usersService: UsersService,
    private readonly productsService: ProductsService,
  ) {}

  search(name: string) {
    return shuffle([
      ...this.usersService.findAll().filter((u) => u.name.includes(name)),
      ...this.productsService.findAll().filter((p) => p.name.includes(name)),
    ]);
  }
}
