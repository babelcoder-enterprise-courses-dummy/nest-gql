import { Field, Int, InterfaceType } from '@nestjs/graphql';
import { Address } from './address.model';
import { EmailScalar } from 'src/core/types/email.scalar';
import { Role } from './role.model';
import { Admin } from './admin.model';
import { Moderator } from './moderator.model';
import { Member } from './member.model';

@InterfaceType({
  resolveType(user: User) {
    if ('level' in user) return Admin;
    if ('section' in user) return Moderator;
    if ('membership' in user) return Member;
  },
})
export abstract class User {
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
}
