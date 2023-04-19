import { Task } from '@src/domain/entities/task';
import { Type } from '@src/main/shared/result';

export interface AddTaskRepository {
  add(name: string): Promise<Type<Task>>;
}
