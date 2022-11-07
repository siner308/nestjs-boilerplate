import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { User } from '../users/user.entity';

@ObjectType()
@Entity('todo')
export class Todo extends BaseEntity {
  @Column({ length: 255 })
  @Field({ nullable: true, deprecationReason: '안쓸래', description: '컨텐츠' })
  content: string;

  @Column({ default: false })
  @Field()
  done: boolean;

  @ManyToOne(() => User, (user) => user.todos)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  @Field(() => User)
  user: User;

  @Column({ name: 'user_id', type: 'int' })
  userId: number;

  @Field()
  get summary(): string {
    return this.content.slice(0, 1);
  }
}
