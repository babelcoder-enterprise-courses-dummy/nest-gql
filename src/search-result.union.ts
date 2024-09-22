import { createUnionType } from '@nestjs/graphql';
import { Product } from './products/product.model';
import { Admin } from './users/models/admin.model';
import { Moderator } from './users/models/moderator.model';
import { Member } from './users/models/member.model';

export const SearchResultUnion = createUnionType({
  name: 'SearchResultUnion',
  types: () => [Admin, Moderator, Member, Product] as const,
  resolveType(item: Admin | Moderator | Member | Product) {
    if ('desc' in item) return Product;
    if ('level' in item) return Admin;
    if ('section' in item) return Moderator;
    if ('membership' in item) return Member;
  },
});
