import { Status, Task } from '@src/domain/entities/task';
import { Mapper } from './mapper';

export class TaskMapper implements Mapper<Record<string, string>, Task> {
  toObject(data: Record<string, string>): Task {
    return {
      ...data,
      status: this.getStatus(data.status),
    } as Task;
  }

  private getStatus(status: string): Status {
    switch (status) {
      case 'Finalizada':
        return Status.Done;
      case 'Cancelada':
        return Status.Cancel;
      default:
        return Status.Wait;
    }
  }
}
