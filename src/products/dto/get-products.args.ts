import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class GetProductsArgs {
  @Field({ defaultValue: 1 })
  page: number;

  @Field({ defaultValue: 10 })
  limit: number;
}
