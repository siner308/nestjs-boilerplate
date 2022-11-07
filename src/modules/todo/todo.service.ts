import { TodoRepository } from './repository/todo.repository';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Todo } from './todo.entity';
import { CreateTodoArgs, TodoPageArgs } from './todo.dto';
import { InvalidContentError } from './todo.error';

@Injectable()
export class TodoService {
  constructor(private readonly todoRepository: TodoRepository) {}

  async findAll(query: TodoPageArgs): Promise<Todo[]> {
    return this.todoRepository.findAll(query);
  }

  async findById(id: number): Promise<Todo> {
    return this.todoRepository.findById(id);
  }

  async removeById(id: number): Promise<void> {
    await this.todoRepository.removeById(id);
  }

  async create(input: CreateTodoArgs): Promise<Todo> {
    const { content } = input;
    if (content.includes('에러')) {
      throw new BadRequestException(InvalidContentError);
    }
    const todo = new Todo({ content });
    return this.todoRepository.save(todo);
  }
}
