import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Category } from 'src/categories/models/category.model';

@ObjectType()
export class Product {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  slug: string;

  @Field()
  desc: string;

  @Field()
  price: number;

  @Field()
  image: string;

  @Field(() => [Category])
  categories: Category[];
}
