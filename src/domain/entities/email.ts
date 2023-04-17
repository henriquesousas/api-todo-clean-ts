import { Type } from '@src/main/shared/result';
import { InvalidEmailError } from '@src/domain/errors/invalid-email-error';

export class Email {
  constructor(private readonly email: string) {}

  static create(email: string): Type<Email> {
    const re = /\S+@\S+\.\S+/;
    const isEmail = re.test(email);
    return isEmail ? new Email(email) : new InvalidEmailError(email);
  }

  get value(): string {
    return this.email;
  }
}
