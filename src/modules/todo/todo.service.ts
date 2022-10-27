import { TodoRepository } from "./repository/todo.repository";
import { Injectable } from "@nestjs/common";
import { Todo } from "./todo.entity";
import { CreateTodoArgs } from "./todo.dto";

export type TodoFilter = {
  content?: string,
} & Pagination;

type Pagination = {
  page: number,
  limit: number,
}

@Injectable()
export class TodoService {
  constructor(private readonly todoRepository: TodoRepository) {
  }

  findAll(query: TodoFilter): Todo[] {
    return this.todoRepository.findAll(query);
  }

  findById(id: string): Todo {
    return this.todoRepository.findById(id);
  }

  removeById(id: string): void {
    this.todoRepository.removeById(id);
  }

  create(input: CreateTodoArgs): Todo {
    const { content } = input;
    const todo = new Todo({
      content
    });
    return this.todoRepository.save(todo);
  }
}