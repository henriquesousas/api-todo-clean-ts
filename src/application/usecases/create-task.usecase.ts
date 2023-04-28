import { CreateTask, CreateTaskDto } from '@src/domain/usecases/task/create-task';
import { AddTaskRepository } from '@src/application/data/repositories/task/add-task.repository';
import { Type } from '@src/main/shared/result';
import { Status } from '@src/domain/entities/task';

export class CreateTaskUseCase implements CreateTask {
  constructor(private readonly addTaskRepo: AddTaskRepository) {}
  async execute({ userId, name }: CreateTaskDto): Promise<Type<string>> {
    const taskId = await this.addTaskRepo.add({
      userId,
      name,
      status: Status.Wait,
    });
    return taskId;
  }
}
