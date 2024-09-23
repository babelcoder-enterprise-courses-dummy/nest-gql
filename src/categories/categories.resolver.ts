import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Category } from './models/category.model';
import { CategoriesService } from './categories.service';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { VoidResolver } from 'graphql-scalars';

@Resolver(() => Category)
export class CategoriesResolver {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Query(() => [Category], { name: 'categories' })
  getCategories() {
    return this.categoriesService.findAll();
  }

  @Query(() => Category, { name: 'category' })
  getCategory(@Args('id', { type: () => Int }) id: number) {
    return this.categoriesService.findById(id);
  }

  @Mutation(() => Category)
  createCategory(@Args('CreateCategoryInput') input: CreateCategoryInput) {
    return this.categoriesService.create(input);
  }

  @Mutation(() => Category)
  updateCategory(@Args('UpdateCategoryInput') input: UpdateCategoryInput) {
    return this.categoriesService.update(input);
  }

  @Mutation(() => VoidResolver)
  async removeCategory(@Args('id', { type: () => Int }) id: number) {
    await this.categoriesService.destroy(id);
    return VoidResolver;
  }
}
