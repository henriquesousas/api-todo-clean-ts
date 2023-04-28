import { MongoUserRepository } from '@src/infra/data/reporitories/mongo/mongo-user.repository';
import { MongoHelper } from '@src/infra/data/reporitories/mongo/helper/mongo-helper';
import { User } from '@src/domain/entities/user';

describe('MongoUserRepository', () => {
  beforeAll(async () => {
    const url = process.env.MONGO_URL as string;
    await MongoHelper.connect(url);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  it('should create a user', async () => {
    const sut = new MongoUserRepository();
    const userId = await sut.create({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
    });
    expect(userId).toBeTruthy();
  });

  it('should get a user by email', async () => {
    const sut = new MongoUserRepository();
    await sut.create({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
    });

    const user = (await sut.getByEmail('any_email')) as User;
    expect(user.id).toBeTruthy();
    expect(user.name).toEqual('any_name');
  });
});
