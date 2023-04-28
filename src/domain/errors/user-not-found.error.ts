import { DomainError } from '@src/domain/errors/base/domain-error';

export class UserNotFoundError extends DomainError {
  constructor() {
    super(404, `Usuário não encontrado`);
  }
}
