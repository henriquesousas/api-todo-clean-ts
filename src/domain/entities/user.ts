import { Email } from '@src/domain/entities/email';
import { Password } from '@src/domain/entities/password';
import { Type, isError } from '@src/main/shared/result';

export class User {
  constructor(
    private readonly name: string,
    private readonly email: Email,
    private readonly password: Password
  ) {}

  static create(name: string, email: string, password: string): Type<User> {
    const emailOrEror = Email.create(email);
    const passwordOrError = Password.create(password);
    if (isError(emailOrEror)) {
      return emailOrEror;
    }

    if (isError(passwordOrError)) {
      return passwordOrError;
    }
    return new User(name, emailOrEror, passwordOrError);
  }
}
