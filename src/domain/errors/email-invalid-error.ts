import { DomainError } from '@src/domain/errors/domain-error';

export class EmailInvalidError extends DomainError {
  constructor(email: string) {
    super(400, `Email ${email} inválido`);
  }
}
