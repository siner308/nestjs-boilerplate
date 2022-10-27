import { ArgsType, Field, InputType, Int } from "@nestjs/graphql";
import { IsPositive } from "class-validator";
import { Optional } from "@nestjs/common";


@InputType()
export abstract class PaginationArgs {
  @Field(() => Int)
  @IsPositive()
  page: number;

  @Field(() => Int)
  @IsPositive()
  limit: number;
}

@InputType()
export class TodoArgs extends PaginationArgs {
  @Field({ nullable: true })
  content?: string;
}

@InputType()
export class CreateTodoArgs {
  @Field()
  content: string;
}