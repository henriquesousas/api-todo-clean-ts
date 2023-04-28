import { Status, Task } from '@src/domain/entities/task';

export const taskMock = (): Task => {
  return {
    id: 'any_id',
    userId: 'any_id',
    name: 'any_name',
    status: Status.Wait,
  };
};
