import {
  BaseEntity as TypeOrmBaseEntity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ isAbstract: true })
export abstract class BaseEntity extends TypeOrmBaseEntity {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  @Field(() => ID)
  id: number;

  @CreateDateColumn({ name: 'created_at' })
  @Field()
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  @Field()
  updatedAt: Date;

  constructor(values?: Record<string, unknown>) {
    super();
    Object.assign(this, values);
  }
}
