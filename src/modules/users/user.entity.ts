import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany } from 'typeorm';
import { Todo } from '../todo/todo.entity';
import { BaseEntity } from '../../common/entities/base.entity';

@ObjectType()
@Entity('user')
export class User extends BaseEntity {
  @Field()
  @Column()
  name: string;

  @Field(() => [Todo])
  @OneToMany(() => Todo, (todo) => todo.user, { cascade: true })
  todos: Todo[];
}
