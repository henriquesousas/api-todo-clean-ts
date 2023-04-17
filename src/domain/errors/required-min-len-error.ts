import { DomainError } from '@src/domain/errors/domain-error';

export class RequiredMinLenError extends DomainError {
  constructor(fieldName: string, min: number) {
    super(400, `${fieldName} deve ter ao menos ${min} caracteres`);
  }
}
