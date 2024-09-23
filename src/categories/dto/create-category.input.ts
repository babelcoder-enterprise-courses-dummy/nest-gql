import { Field, InputType } from '@nestjs/graphql';
import { IsString, Length } from 'class-validator';

@InputType()
export class CreateCategoryInput {
  @IsString()
  @Length(5, 50)
  @Field()
  name: string;

  @IsString()
  @Length(10, 150)
  @Field()
  desc: string;
}
