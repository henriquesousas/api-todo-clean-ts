import { Email } from '@src/domain/entities/email';
import { Password } from '@src/domain/entities/password';
import { User } from '@src/domain/entities/user';
import { MongoUserRepository } from '@src/infra/data/reporitories/mongo/mongo-user.repository';

describe('MongoUserRepository', () => {
  it('should create a user', async () => {
    const sut = new MongoUserRepository();
    const result = await sut.create({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
    });
    const user = new User('any_name', new Email(''), new Password(''));
    expect(result).toEqual(user);
  });
});
