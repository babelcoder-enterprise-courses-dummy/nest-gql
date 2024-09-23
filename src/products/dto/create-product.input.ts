import { Field, InputType, Int } from '@nestjs/graphql';
import { Length } from 'class-validator';

@InputType()
export class CreateProductInput {
  @Length(5, 50)
  @Field()
  name: string;

  @Length(10, 150)
  @Field()
  desc: string;

  @Field()
  price: number;

  @Field(() => [Int])
  categoryIds: number[];

  @Field()
  image: string;
}
