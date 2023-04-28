export interface DeleteTask {
  execute(taskId: string): Promise<boolean>;
}