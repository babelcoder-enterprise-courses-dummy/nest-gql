import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { Product } from './product.model';
import { GetProductsArgs } from './dto/get-products.args';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { VoidResolver } from 'graphql-scalars';

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

  @Mutation(() => Product)
  createProduct(@Args('CreateProductInput') input: CreateProductInput) {
    return this.productsService.create(input);
  }

  @Mutation(() => Product)
  updateProduct(@Args('UpdateProductInput') input: UpdateProductInput) {
    return this.productsService.update(input);
  }

  @Mutation(() => VoidResolver)
  removeProduct(@Args('id', { type: () => Int }) id: number) {
    this.productsService.remove(id);
    return VoidResolver;
  }
}
