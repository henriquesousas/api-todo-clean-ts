import { DomainError } from '@src/domain/errors/base/domain-error';

export class EmailAlreadyExistError extends DomainError {
  constructor() {
    super(400, 'Email já cadastrado em nosso sistema');
  }
}
