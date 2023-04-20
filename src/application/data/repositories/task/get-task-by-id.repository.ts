import { Task } from '@src/domain/entities/task';

export interface GetTaskByIdRepository {
  getById(id: string): Promise<Task | null>;
}
