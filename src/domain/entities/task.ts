export interface Task {
  id: string;
  name: string;
  status: Status;
}

//TODO: create a values of status in a especific file
export enum Status {
  Wait = 'Aguardando',
  Done = 'Finalizada',
  Cancel = 'Cancelada',
}
