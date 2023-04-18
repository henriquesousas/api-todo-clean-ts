export interface Task {
  id: string;
  name: string;
  status: Status;
}

export enum Status {
  Done = 'Finalizada',
  Cancel = 'Cancelada',
}
