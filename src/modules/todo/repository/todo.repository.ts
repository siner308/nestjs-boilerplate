import { Todo } from "../todo.entity";
import { v4 as uuid } from "uuid";
import { TodoFilter } from "../todo.service";

export class TodoRepository {
  private data: Todo[];

  constructor() {
    this.data = [];
    this.save(new Todo({ content: "청소" }));
    this.save(new Todo({ content: "게임" }));
    this.save(new Todo({ content: "공부" }));
    this.save(new Todo({ content: "저녁식사" }));
    this.save(new Todo({ content: "산책" }));
    this.save(new Todo({ content: "등산" }));
  }

  findAll(query: TodoFilter): Todo[] {
    const { content, page, limit } = query;
    let result = this.data;
    if (content) result = result.filter((todo) => todo.content.includes(content));
    if (page && limit) result = result.slice(limit * (page - 1), (limit * (page - 1)) + limit);
    return result.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
  }

  findById(id: string): Todo {
    return this.data.find((todo) => todo.id === id);
  }

  removeById(id: string): void {
    this.data = this.data.filter((todo) => todo.id !== id);
  }

  save(todo: Todo): Todo {
    const now = new Date();
    if (!todo.id) todo.id = uuid();
    if (!todo.createdAt) todo.createdAt = now;
    if (todo.done === undefined) todo.done = false;
    todo.updatedAt = now;
    this.data.push(todo); // insert into database
    this.data = this.data.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
    return todo;
  }
}