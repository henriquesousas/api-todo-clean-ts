import { User } from '@src/domain/entities/user';
import { userMock } from '@test/domain/entities/mocks/user.mock';
import { UserRepositoryStub } from '@test/infra/data/repositories/mongo/mocks/mongo-user-repository.stub';
import { UserNotFoundError } from '@src/domain/errors/user-not-found.error';
import { NoData } from '@src/infra/data/repositories/errors/no-data';
import { GetUserByEmailUseCase } from '@src/application/usecases/user/get-user-by-email.usecase';

describe('GetUserByEmailRepository', () => {
  it('should get a user by email', async () => {
    const getUserRepo = new UserRepositoryStub();
    const sut = new GetUserByEmailUseCase(getUserRepo);
    const user = (await sut.execute('any_email')) as User;
    expect(user.email.value).toBe(userMock().email.value);
  });

  it('should return an error if user not exist', async () => {
    const getUserRepo = new UserRepositoryStub();
    const sut = new GetUserByEmailUseCase(getUserRepo);
    jest.spyOn(getUserRepo, 'getByEmail').mockImplementationOnce(async () => {
      return new NoData();
    });
    const userOrError = await sut.execute('any_email');
    expect(userOrError).toEqual(new UserNotFoundError());
  });
});
