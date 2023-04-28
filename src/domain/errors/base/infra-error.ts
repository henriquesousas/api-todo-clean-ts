import { ApplicationError } from './application-error';

export abstract class InfraError extends ApplicationError {
  constructor(readonly code: number, readonly message: string) {
    super(code, message);
  }
}
