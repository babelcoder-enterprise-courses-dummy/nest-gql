import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { Product } from './product.model';
import { GetProductsArgs } from './dto/get-products.args';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Query(() => [Product], { name: 'products' })
  getProducts(@Args() args: GetProductsArgs) {
    return this.productsService.findAll(args);
  }

  @Query(() => Product, { name: 'product' })
  getProduct(@Args('id', { type: () => Int }) id: number) {
    return this.productsService.findById(id);
  }
}
