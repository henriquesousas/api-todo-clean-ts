
export type AddTaskDto = {
  userId: string;
  name: string;
  status: string;
};

export interface AddTaskRepository {
  add(dto: AddTaskDto): Promise<string>;
}
