import { Field, InputType, Int } from '@nestjs/graphql';
import { IsPositive } from 'class-validator';

@InputType()
export abstract class PaginationArgs {
  @Field(() => Int)
  @IsPositive()
  page: number;

  @Field(() => Int)
  @IsPositive()
  limit: number;
}
