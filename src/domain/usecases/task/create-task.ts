import { Type } from '@src/main/shared/result';

export type CreateTaskDto = {
  userId: string;
  name: string;
};

export interface CreateTask {
  execute(dto: CreateTaskDto): Promise<Type<string>>;
}
