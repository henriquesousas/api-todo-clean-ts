import { CreateTaskUseCase } from '@src/application/usecases/task/create-task.usecase';
import { MongoTaskRepositoryStub } from '@test/infra/data/repositories/mongo/mocks/mongo-task-repository.stub';

describe('CreateTaskUseCase', () => {
  it('should create a task', async () => {
    const createTaskRepo = new MongoTaskRepositoryStub();
    const sut = new CreateTaskUseCase(createTaskRepo);
    const taskId = (await sut.execute({
      userId: 'any_id',
      name: 'any_name',
    })) as string;

    expect(taskId).toBe('any_id');
  });
});
