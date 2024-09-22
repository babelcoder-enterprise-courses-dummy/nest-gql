import { Args, Query, Resolver } from '@nestjs/graphql';
import { SearchResultUnion } from './search-result.union';
import { AppService } from './app.service';

@Resolver()
export class AppResolver {
  constructor(private readonly appService: AppService) {}

  @Query(() => [SearchResultUnion])
  search(@Args('name') name: string) {
    return this.appService.search(name);
  }
}
