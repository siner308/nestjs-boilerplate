import { Todo } from '../todo.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { TodoPageArgs } from '../todo.dto';

export class TodoRepository {
  constructor(private readonly repository: Repository<Todo>) {}

  async findAll(query: TodoPageArgs): Promise<Todo[]> {
    const { content, page, limit } = query;

    const queryBuilder: SelectQueryBuilder<Todo> = this.repository
      .createQueryBuilder('todo')
      .where('1=1');

    if (content) {
      queryBuilder.andWhere('like.content like :contentLike', {
        contentLike: `%${content}%`,
      });
    }

    return queryBuilder
      .skip(limit * (page - 1))
      .take(limit)
      .getMany();
  }

  async findById(id: number): Promise<Todo> {
    return this.repository.findOne({
      where: {
        id,
      },
    });
  }

  async removeById(id: number): Promise<void> {
    const todo = await this.findById(id);
    await this.repository.remove(todo);
  }

  async save(todo: Todo): Promise<Todo> {
    return this.repository.save(todo);
  }
}
