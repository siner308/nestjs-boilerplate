import {
  Args,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Todo } from './todo.entity';
import { CreateTodoArgs, TodoPageArgs } from './todo.dto';
import { TodoService } from './todo.service';

@Resolver(() => Todo)
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  @Query(() => [Todo], { deprecationReason: '테스트' })
  async todos(@Args('input') input: TodoPageArgs) {
    return this.todoService.findAll(input);
  }

  @Query(() => Todo)
  async todo(@Args('id', { type: () => ID }) id: number) {
    return this.todoService.findById(id);
  }

  @Mutation(() => Todo, {
    description: "'에러'를 문자열에 넣으면 에러를 발생시킬 수 있음.",
  })
  async createTodo(@Args('input') input: CreateTodoArgs) {
    return this.todoService.create(input);
  }

  @Mutation(() => String)
  async removeTodo(@Args('id', { type: () => ID }) id: number) {
    await this.todoService.removeById(id);
    return 'OK';
  }

  @ResolveField(() => String)
  summary2(@Parent() todo: Todo) {
    return todo.summary + 'asdfasdf';
  }
}
