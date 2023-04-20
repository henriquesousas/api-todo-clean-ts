import { MongoTaskRepository } from '@src/infra/data/reporitories/mongo/mongo-task.repository';
import { MongoHelper } from '@src/infra/data/reporitories/mongo/helper/mongo-helper';
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

  const addTask = async (): Promise<Task | null> => {
    const task = await sut.add({
      userId,
      name: 'any_name',
      status: Status.Wait.toString(),
    });
    return task;
  };

  describe('Add', () => {
    it('should add a task', async () => {
      const task = await addTask();
      expect(task?.name).toBe('any_name');
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
      const taskCreated = (await addTask()) as Task;
      const task = await sut.getById(taskCreated.id);
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
      const taskCreated = (await addTask()) as Task;
      await sut.delete(taskCreated.id);
      const task = await sut.getById(taskCreated.id);
      expect(task).toBeFalsy();
    });
  });
});
