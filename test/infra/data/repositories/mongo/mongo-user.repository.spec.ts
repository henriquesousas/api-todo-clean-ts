import { MongoUserRepository } from '@src/infra/data/reporitories/mongo/mongo-user.repository';
import { MongoHelper } from '@src/infra/data/reporitories/mongo/mongo-helper';

describe('MongoUserRepository', () => {
  beforeAll(async () => {
    const url = process.env.MONGO_URL;
    await MongoHelper.connect(url!);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  it('should create a user', async () => {
    const sut = new MongoUserRepository();
    const user = await sut.create({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
    });
    expect(user.id).toBeTruthy();
    expect(user.name).toEqual('any_name');
  });
});
