import { Status, Task } from '@src/domain/entities/task';

describe('Task', () => {
  it('should create a task', () => {
    const sut: Task = {
      id: 'any_id',
      name: 'any_name',
      status: Status.Done,
    };
    expect(sut.status).toBe('Finalizada');
  });
});
