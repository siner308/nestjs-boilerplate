import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './modules/todo/todo.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { DateScalar } from './common/scalars/date.scalar';
import { DatabaseModule } from './modules/database/database.module';
import { GqlModuleOptions } from '@nestjs/graphql/dist/interfaces/gql-module-options.interface';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { env } from './env';
import { KeycloakConnectModule } from 'nest-keycloak-connect';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    TodoModule,
    AuthModule,
    GraphQLModule.forRootAsync<GqlModuleOptions>({
      driver: ApolloDriver,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          debug: configService.get(env.debug),
          // playground: env.debug,
          autoSchemaFile: 'src/schema.gql',
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, DateScalar],
})
export class AppModule {}
