import { TodoFilter, TodoService } from "./todo.service";
import { Controller, Delete, Get, Param, ParseIntPipe, Query } from "@nestjs/common";
import { query } from "express";
import { Todo } from "./todo.entity";

@Controller("todo")
export class TodoController {
  constructor(private readonly todoService: TodoService) {
  }

  @Get("/")
  async findAll(
    @Query('content') content: string,
    @Query('page', {
      transform: (value: string) => value && Number(value),
    }) page: number,
    @Query('limit', {
      transform: (value: string) => value && Number(value),
    }) limit: number,
  ): Promise<Todo[]> {
    return this.todoService.findAll({
      content,
      page,
      limit,
    });
  }

  @Get("/:id")
  async findById(@Param("id", new ParseIntPipe()) id: number) {
    return this.todoService.findById(Number(id));
  }

  @Delete("/:id")
  async remove(@Param("id", new ParseIntPipe()) id: number) {
    await this.todoService.removeById(id);
    return "OK";
  }
}