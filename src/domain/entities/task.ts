export interface Task {
  id: string;
  userId: string;
  name: string;
  status: Status;
}

export enum Status {
  Wait = 'Aguardando',
  Done = 'Finalizada',
  Cancel = 'Cancelada',
}
