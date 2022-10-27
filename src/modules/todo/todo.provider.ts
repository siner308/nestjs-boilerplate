import { Provider } from "@nestjs/common";
import { TodoService } from "./todo.service";

export const todoProviders: Provider[] = [
  {
    provide: "TODO_SERVICE",
    useValue: TodoService
  },
];