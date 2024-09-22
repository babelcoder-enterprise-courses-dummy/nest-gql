import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { capitalize } from 'lodash';

@ObjectType()
export class Product {
  @Field(() => Int)
  id: number;

  @Field()
  @Transform(({ value }) => capitalize(value))
  name: string;

  @Field()
  desc: string;

  constructor(product: Product) {
    Object.assign(this, product);
  }
}
