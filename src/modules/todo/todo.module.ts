import { Module } from "@nestjs/common";
import { TodoService } from "./todo.service";
import { TodoRepository } from "./repository/todo.repository";
import { TodoController } from "./todo.controller";
import { TodoResolver } from "./todo.resolver";

@Module({
  providers: [TodoService, TodoRepository, TodoResolver],
  controllers: [TodoController],
})
export class TodoModule {}