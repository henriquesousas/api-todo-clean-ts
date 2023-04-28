import {
  AddTaskDto,
  AddTaskRepository,
} from '@src/application/data/repositories/task/add-task.repository';

export class MongoTaskRepositoryStub implements AddTaskRepository {
  async add(_: AddTaskDto): Promise<string> {
    return Promise.resolve('any_id');
  }
}
