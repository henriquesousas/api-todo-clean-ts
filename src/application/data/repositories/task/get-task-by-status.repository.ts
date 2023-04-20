import { Status, Task } from '@src/domain/entities/task';
import { Type } from '@src/main/shared/result';

export interface GetTaskByStatusRepository {
  getByStatus(userId: string, status: Status): Promise<Type<Task[]>>;
}
