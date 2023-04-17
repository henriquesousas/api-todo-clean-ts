import { DomainError } from '@src/domain/errors/base/domain-error';

export class InvalidEmailError extends DomainError {
  constructor(email: string) {
    super(400, `Email ${email} inválido`);
  }
}
