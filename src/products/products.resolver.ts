import {
  Args,
  Context,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Product } from './models/product.model';
import { ProductsService } from './products.service';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { VoidResolver } from 'graphql-scalars';
import { GetProductsArgs } from './dto/get-products.args';
import { ProductList } from './models/product-list.model';
import { CategoriesService } from 'src/categories/categories.service';
import { Category } from 'src/categories/models/category.model';
import { DataLoaders } from 'src/data-loaders/data-loaders.model';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(
    private readonly productsService: ProductsService,
    private readonly categoriesService: CategoriesService,
  ) {}

  @Query(() => ProductList, { name: 'products' })
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
  async removeProduct(@Args('id', { type: () => Int }) id: number) {
    await this.productsService.destroy(id);
    return VoidResolver;
  }

  @ResolveField(() => [Category])
  categories(
    @Parent() product: Product,
    @Context('loaders') loaders: DataLoaders,
  ) {
    return loaders.categoriesLoader.load(product.id);
  }
}
