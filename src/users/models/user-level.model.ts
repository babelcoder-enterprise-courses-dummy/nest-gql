import { registerEnumType } from '@nestjs/graphql';

export enum UserLevel {
  CLASSIC,
  SILVER,
  GOLD,
  PLATINUM,
}

registerEnumType(UserLevel, {
  name: 'UserLevel',
  description: 'The user level',
});
