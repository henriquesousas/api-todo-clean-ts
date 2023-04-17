import { ApplicationError } from '@src/domain/errors/application-error';

export abstract class DomainError extends ApplicationError {
  constructor(readonly code: number, readonly message: string) {
    super(code, message);
  }
}
