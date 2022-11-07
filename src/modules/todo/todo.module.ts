import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { TodoResolver } from './todo.resolver';
import { TodoRepositoryModule } from './repository/todo.repository.module';

@Module({
  imports: [TodoRepositoryModule],
  providers: [TodoService, TodoResolver],
  controllers: [TodoController],
})
export class TodoModule {}
