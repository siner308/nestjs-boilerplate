import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from "./modules/todo/todo.module";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { env } from "./env";
import { DateScalar } from "./common/scalars/date.scalar";

@Module({
  imports: [
    TodoModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: env.debug,
      playground: env.debug,
      autoSchemaFile: 'src/schema.gql',
    }),
  ],
  controllers: [AppController],
  providers: [AppService, DateScalar],
})
export class AppModule {}
