import { Email } from '@src/domain/entities/email';
import { Password } from '@src/domain/entities/password';
import { Type, isError } from '@src/main/shared/result';

export class User {
  constructor(
    readonly name: string,
    readonly email: Email,
    readonly password: Password,
    readonly id?: string
  ) {}

  static create(name: string, email: string, password: string): Type<User> {
    const emailOrError = Email.create(email);
    if (isError(emailOrError)) {
      return emailOrError;
    }

    const passwordOrError = Password.create(password);
    if (isError(passwordOrError)) {
      return passwordOrError;
    }
    return new User(name, emailOrError, passwordOrError);
  }
}
