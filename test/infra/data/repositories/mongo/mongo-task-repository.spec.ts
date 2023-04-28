import { MongoTaskRepository } from '@src/infra/data/repositories/mongo/mongo-task.repository';
import { MongoHelper } from '@src/infra/data/repositories/mongo/helper/mongo-helper';
import { Status, Task } from '@src/domain/entities/task';

describe('MongoTaskRepository', () => {
  const userId = '6441739f90de16fa9eaa7a5a';
  let sut: MongoTaskRepository;

  beforeAll(async () => {
    const url = process.env.MONGO_URL as string;
    await MongoHelper.connect(url);
    sut = new MongoTaskRepository();
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  afterEach(async () => {
    await MongoHelper.getCollection('tasks').deleteMany({});
  });

  const addTask = async (): Promise<string> => {
    const taskId = await sut.add({
      userId,
      name: 'any_name',
      status: Status.Wait.toString(),
    });
    return taskId;
  };

  describe('Add', () => {
    it('should add a task', async () => {
      const taskId = await addTask();
      expect(taskId).toBeTruthy();
    });
  });

  describe('Get', () => {
    it('should return a task by status', async () => {
      await addTask();
      const tasks = (await sut.getByStatus(userId, Status.Wait)) as Task[];
      expect(tasks).toHaveLength(1);
      expect(tasks[0].status).toBe('Aguardando');
    });

    it('should return a empty list when status not exist', async () => {
      const tasks = (await sut.getByStatus(userId, Status.Done)) as Task[];
      expect(tasks).toHaveLength(0);
    });

    it('should return a task by id', async () => {
      const taskId = (await addTask()) as string;
      const task = await sut.getById(taskId);
      expect(task?.userId).toBe('6441739f90de16fa9eaa7a5a');
      expect(task?.name).toBe('any_name');
      expect(task?.status).toBe('Aguardando');
    });

    it('should return null ', async () => {
      const task = await sut.getById('6441739f90de16fa9eaa7a5b');
      expect(task).toBeFalsy();
    });
  });

  describe('Delete', () => {
    it('should delete a task', async () => {
      const taskId = (await addTask()) as string;
      await sut.delete(taskId);
      const task = await sut.getById(taskId);
      expect(task).toBeFalsy();
    });
  });
});
