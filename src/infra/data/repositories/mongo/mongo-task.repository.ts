import {
  AddTaskDto,
  AddTaskRepository,
} from '@src/application/data/repositories/task/add-task.repository';
import { BaseMongoRepository } from './helper/base-mongo.repository';
import { Status, Task } from '@src/domain/entities/task';
import { ObjectId } from 'mongodb';
import { Type } from '@src/main/shared/result';
import { GetTaskByStatusRepository } from '@src/application/data/repositories/task/get-task-by-status.repository';
import { GetTaskByIdRepository } from '@src/application/data/repositories/task/get-task-by-id.repository';
import { DeleteTaskRepository } from '@src/application/data/repositories/task/delete-task.repository';

export class MongoTaskRepository
  extends BaseMongoRepository
  implements
    AddTaskRepository,
    GetTaskByStatusRepository,
    GetTaskByIdRepository,
    DeleteTaskRepository
{
  getCollection = (): string => 'tasks';

  async add(dto: AddTaskDto): Promise<string> {
    return await this.insert(dto);
  }

  async getByStatus(userId: string, status: Status): Promise<Type<Task[]>> {
    const taskDocuments = await this.find({
      userId: userId,
      status: status.toString(),
    });
    return taskDocuments as Task[];
  }

  async getById(id: string): Promise<Task | null> {
    const taskDocument = await this.findOne({ _id: new ObjectId(id) });
    if (!taskDocument) {
      return null;
    }
    return taskDocument as Task;
  }

  async delete(id: string): Promise<void> {
    const filter = {
      _id: new ObjectId(id),
    };
    await this.deleteOne(filter);
  }
}
