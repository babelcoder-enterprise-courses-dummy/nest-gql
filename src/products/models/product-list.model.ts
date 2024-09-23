import { Field, ObjectType } from '@nestjs/graphql';
import { PaginationMeta } from 'src/core/models/pagination-meta.model';
import { Product } from './product.model';

@ObjectType()
export class ProductList {
  @Field()
  meta: PaginationMeta;

  @Field(() => [Product])
  items: Product[];
}
