import { Status, Task } from '@src/domain/entities/task';

describe('Task', () => {
  it('should create a task', () => {
    const sut: Task = {
      id: 'any_id',
      userId: '6441739f90de16fa9eaa7a5a',
      name: 'any_name',
      status: Status.Done,
    };
    expect(sut.status).toBe(Status.Done);
  });
});
