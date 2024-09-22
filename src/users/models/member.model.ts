import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from './user.model';
import { UserLevel } from './user-level.model';
import { EmailScalar } from 'src/core/types/email.scalar';
import { Address } from './address.model';
import { Role } from './role.model';

@ObjectType({
  implements: () => [User],
})
export class Member implements User {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => EmailScalar)
  email: string;

  @Field(() => Role)
  role: Role;

  @Field(() => Address, { nullable: true })
  address?: Address;

  @Field(() => UserLevel)
  membership: UserLevel;
}
