import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Todo } from "./todo.entity";
import { CreateTodoArgs, TodoArgs } from "./todo.dto";
import { TodoService } from "./todo.service";

@Resolver(() => Todo)
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {
  }

  @Query(() => [Todo])
  async todos(@Args('input') input: TodoArgs) {
    return this.todoService.findAll(input);
  }

  @Query(() => Todo)
  async todo(@Args("id", { type: () => ID }) id: string) {
    return this.todoService.findById(id);
  }

  @Mutation(() => Todo)
  async createTodo(@Args('input') input: CreateTodoArgs) {
    return this.todoService.create(input);
  }

  @Mutation(() => String)
  async removeTodo(@Args("id", { type: () => ID }) id: string) {
    this.todoService.removeById(id);
    return "OK";
  }
}