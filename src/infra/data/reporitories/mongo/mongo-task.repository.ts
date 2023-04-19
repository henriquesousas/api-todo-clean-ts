import { AddTaskRepository } from '@src/application/data/repositories/task/add-task.repository';
import { BaseMongoRepository } from './helper/base-mongo.repository';
import { Status, Task } from '@src/domain/entities/task';
import { ObjectId } from 'mongodb';
import { Type } from '@src/main/shared/result';
import { TaskMapper } from '@src/infra/data/reporitories/mongo/mapper/task.mapper';

export class MongoTaskRepository
  extends BaseMongoRepository
  implements AddTaskRepository
{
  getCollection = (): string => 'tasks';

  async add(name: string): Promise<Type<Task>> {
    const data = {
      name,
      status: Status.Wait,
    };
    const taskId = await this.insert(data);
    const taskDocument = await this.findOne({ _id: new ObjectId(taskId) });
    return new TaskMapper().toObject(taskDocument);
  }
}
