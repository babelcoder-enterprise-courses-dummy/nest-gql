import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Address } from './address.model';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field(() => Address, { nullable: true })
  address?: Address;
}
