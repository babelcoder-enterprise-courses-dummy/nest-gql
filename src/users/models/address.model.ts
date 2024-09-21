import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Address {
  @Field(() => Int)
  id: number;

  @Field()
  houseNumber: string;

  @Field(() => Int)
  userId: number;
}
