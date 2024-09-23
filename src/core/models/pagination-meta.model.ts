import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PaginationMeta {
  @Field(() => Int)
  page: number;

  @Field(() => Int)
  limit: number;

  @Field(() => Int, { nullable: true })
  previousPage?: number;

  @Field(() => Int, { nullable: true })
  nextPage?: number;

  @Field(() => Int)
  totalCount: number;
}
