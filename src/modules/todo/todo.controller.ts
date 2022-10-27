import { TodoFilter, TodoService } from "./todo.service";
import { Controller, Delete, Get, Param, Query } from "@nestjs/common";
import { query } from "express";
import { Todo } from "./todo.entity";

@Controller("todo")
export class TodoController {
  constructor(private readonly todoService: TodoService) {
  }

  @Get("/")
  findAll(
    @Query('content') content: string,
    @Query('page', {
      transform: (value: string) => value && Number(value),
    }) page: number,
    @Query('limit', {
      transform: (value: string) => value && Number(value),
    }) limit: number,
  ): Todo[] {
    return this.todoService.findAll({
      content,
      page,
      limit,
    });
  }

  @Get("/:id")
  findById(@Param("id") id: string) {
    return this.todoService.findById(id);
  }

  @Delete("/:id")
  remove(@Param("id") id: string) {
    this.todoService.removeById(id);
    return {
      result: "OK"
    };
  }
}