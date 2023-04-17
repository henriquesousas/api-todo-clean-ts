import { Type } from '@src/shared/result';
import { EmailInvalidError } from '@src/domain/errors/email-invalid-error';

export class Email {
  constructor(private readonly email: string) {}

  static create(email: string): Type<Email> {
    const re = /\S+@\S+\.\S+/;
    const isEmail = re.test(email);
    return isEmail ? new Email(email) : new EmailInvalidError(email);
  }

  get value(): string {
    return this.email;
  }
}
