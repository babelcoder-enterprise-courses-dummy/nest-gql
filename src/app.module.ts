import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ProductsModule } from './products/products.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { CoreModule } from './core/core.module';
import { EmailScalar } from './core/types/email.scalar';
import { AppResolver } from './app.resolver';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      resolvers: { Email: EmailScalar },
      fieldResolverEnhancers: ['interceptors'],
    }),
    ProductsModule,
    UsersModule,
    CoreModule,
  ],
  controllers: [],
  providers: [AppService, AppResolver],
})
export class AppModule {}
