import { Field, InputType } from '@nestjs/graphql';
import { Length } from 'class-validator';

@InputType()
export class CreateProductInput {
  @Length(5, 50)
  @Field()
  name: string;

  @Length(10, 150)
  @Field()
  desc: string;
}
