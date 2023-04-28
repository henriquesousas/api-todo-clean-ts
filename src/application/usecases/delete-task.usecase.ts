import { DeleteTask } from '@src/domain/usecases/task/delete-task';
import { DeleteTaskRepository } from '@src/application/data/repositories/task/delete-task.repository';
import { GetTaskByIdRepository } from '@src/application/data/repositories/task/get-task-by-id.repository';

export class DeleteTaskUseCase implements DeleteTask {
  constructor(
    private readonly deleteTaskRepo: DeleteTaskRepository,
    private readonly getTaskRepo: GetTaskByIdRepository
  ) {}
  async execute(taskId: string): Promise<boolean> {
    await this.deleteTaskRepo.delete(taskId);
    const task = await this.getTaskRepo.getById(taskId);
    return task === null ? true : false;
  }
}
