import { Email } from '@src/domain/entities/email';
import { Password } from '@src/domain/entities/password';
import { User } from '@src/domain/entities/user';

export const userMock = (): User => {
  return new User(
    'any_name',
    new Email('any_email'),
    new Password('any_password'),
    'any_id'
  );
};
