import { registerEnumType } from '@nestjs/graphql';

export enum Role {
  MEMBER,
  MODERATOR,
  ADMIN,
}

registerEnumType(Role, { name: 'Role', description: 'The user role' });
