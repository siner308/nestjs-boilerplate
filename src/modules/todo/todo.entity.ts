import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Todo {
  @Field()
  id: string;

  @Field()
  content: string;

  @Field()
  done: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  constructor(data?: Partial<Todo>) {
    data && Object.assign(this, data);
  }
}