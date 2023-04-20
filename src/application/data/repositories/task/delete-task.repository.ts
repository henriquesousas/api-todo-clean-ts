export interface DeleteTaskRepository {
  delete(id: string): Promise<void>;
}
