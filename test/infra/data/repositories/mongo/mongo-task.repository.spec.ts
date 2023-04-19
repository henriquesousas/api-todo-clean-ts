import { MongoTaskRepository } from '@src/infra/data/reporitories/mongo/mongo-task.repository';
import { MongoHelper } from '@src/infra/data/reporitories/mongo/helper/mongo-helper';

describe('TaskRepository', () => {
  beforeAll(async () => {
    const url = process.env.MONGO_URL as string;
    await MongoHelper.connect(url);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  it('should add a task', async () => {
    const sut = new MongoTaskRepository();
    const task = await sut.add('any_task');
    expect(task.name).toBe('any_task');
  });
});
