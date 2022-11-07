import { Field, InputType } from '@nestjs/graphql';
import { PaginationArgs } from '../../common/args/page.args';

@InputType()
export class TodoPageArgs extends PaginationArgs {
  @Field({ nullable: true })
  content?: string;
}

@InputType()
export class CreateTodoArgs {
  @Field()
  content: string;
}
