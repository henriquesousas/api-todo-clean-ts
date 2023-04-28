import { MongoTaskRepositoryStub } from '@test/infra/data/repositories/mongo/mocks/mongo-task-repository.stub';
import { DeleteTaskUseCase } from '@src/application/usecases/delete-task.usecase';

describe('DeleteTaskUseCase', () => {
  it('should delete a task', async () => {
    const deleteTaskRepoStub = new MongoTaskRepositoryStub();
    const getTaskRepoStub = new MongoTaskRepositoryStub();
    jest.spyOn(getTaskRepoStub, 'getById').mockImplementationOnce(async () => {
      return null;
    });
    const sut = new DeleteTaskUseCase(deleteTaskRepoStub, getTaskRepoStub);
    const result = await sut.execute('any_id');
    expect(result).toBe(true);
  });
});
