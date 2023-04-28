import { Email } from '@src/domain/entities/email';
import { Password } from '@src/domain/entities/password';
import { User } from '@src/domain/entities/user';
import { Mapper } from './mapper';

export class UserMapper implements Mapper<Record<string, string>, User> {
  toObject(data: Record<string, string>): User {
    return {
      ...data,
      email: new Email(data.email),
      password: new Password(data.password),
    } as User;
  }
}
