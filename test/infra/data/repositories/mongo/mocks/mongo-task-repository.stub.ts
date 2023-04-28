import {
  AddTaskDto,
  AddTaskRepository,
} from '@src/application/data/repositories/task/add-task.repository';
import { DeleteTaskRepository } from '@src/application/data/repositories/task/delete-task.repository';
import { GetTaskByIdRepository } from '@src/application/data/repositories/task/get-task-by-id.repository';
import { Task } from '@src/domain/entities/task';
import { taskMock } from '@test/domain/entities/mocks/task.mock';

export class MongoTaskRepositoryStub
  implements AddTaskRepository, DeleteTaskRepository, GetTaskByIdRepository
{
  async add(_: AddTaskDto): Promise<string> {
    return Promise.resolve('any_id');
  }

  async delete(id: string): Promise<void> {
    Promise.resolve();
  }

  async getById(id: string): Promise<Task | null> {
    return Promise.resolve(taskMock());
  }
}
