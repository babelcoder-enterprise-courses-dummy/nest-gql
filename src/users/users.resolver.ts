import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { User } from './models/user.model';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User], { name: 'users' })
  getUsers() {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  getUser(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findById(id);
  }

  @ResolveField()
  address(@Parent() user: User) {
    return this.usersService.findAddressByUserId(user.id);
  }
}
