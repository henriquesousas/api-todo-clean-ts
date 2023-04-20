import { Task } from '@src/domain/entities/task';

export type AddTaskDto = {
  userId: string;
  name: string;
  status: string;
};

export interface AddTaskRepository {
  add(dto: AddTaskDto): Promise<Task | null>;
}
