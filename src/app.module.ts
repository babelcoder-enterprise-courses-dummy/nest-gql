import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ProductsModule } from './products/products.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { CoreModule } from './core/core.module';
import { EmailScalar } from './core/types/email.scalar';
import { CategoriesModule } from './categories/categories.module';
import { DataLoadersService } from './data-loaders/data-loaders.service';
import { DataLoadersModule } from './data-loaders/data-loaders.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [DataLoadersModule],
      inject: [DataLoadersService],
      useFactory(dataloaderService: DataLoadersService) {
        return {
          autoSchemaFile: true,
          playground: false,
          plugins: [ApolloServerPluginLandingPageLocalDefault()],
          resolvers: { Email: EmailScalar },
          fieldResolverEnhancers: ['interceptors'],
          context: () => ({
            loaders: dataloaderService.getLoaders(),
          }),
          formatError: (error) => {
            const originalError = error.extensions?.originalError as Error;

            if (!originalError) {
              return {
                message: error.message,
                code: error.extensions?.code,
              };
            }
            return {
              message: originalError.message,
              code: error.extensions?.code,
            };
          },
        };
      },
    }),
    ProductsModule,
    UsersModule,
    CoreModule,
    CategoriesModule,
    DataLoadersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
