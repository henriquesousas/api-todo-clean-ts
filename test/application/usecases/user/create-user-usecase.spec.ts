import { CreateUserUseCase } from '@src/application/usecases/create-user.usecase';
import { CreateUser, CreateUserResultDto } from '@src/domain/usecases/user/create-user';
import { User } from '@src/domain/entities/user';
import { Email } from '@src/domain/entities/email';
import { Password } from '@src/domain/entities/password';
import { EmailAlreadyExistError } from '@src/domain/errors/email_already_exist.error';
import { CreateUserRepository } from '@src/application/data/repositories/user/create-user.repository';
import { GetUserByEmailRepository } from '@src/application/data/repositories/user/get-user-by-email.repository';
import { Hash } from '@src/application/cryptography/cryptography/hash';
import { UserRepositoryStub } from '@test/infra/data/repositories/mongo/mocks/mongo-user-repository.stub';
import { HashSpy } from '@test/infra/cryptography/mocks/hash.spy';
import { NoData } from '@src/infra/data/reporitories/errors/no-data';

interface sutTypes {
  sut: CreateUser;
  createUserRepoSpy: CreateUserRepository;
  getUserRepoSpy: GetUserByEmailRepository;
  hashSpy: Hash;
}

const makeSut = (): sutTypes => {
  const createUserRepoSpy = new UserRepositoryStub();
  const getUserRepoSpy = new UserRepositoryStub();
  const hashSpy = new HashSpy();
  const sut = new CreateUserUseCase(createUserRepoSpy, getUserRepoSpy, hashSpy);
  return {
    sut,
    createUserRepoSpy,
    getUserRepoSpy,
    hashSpy,
  };
};

describe('CraeteUserUseCase', () => {
  it('should create a user', async () => {
    const { sut, getUserRepoSpy } = makeSut();
    jest.spyOn(getUserRepoSpy, 'getByEmail').mockImplementationOnce(async () => {
      return new NoData();
    });
    const accessTokenOrError = (await sut.execute({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
    })) as CreateUserResultDto;

    expect(accessTokenOrError.accessToken).toBeTruthy();
  });

  it('should call a hash with correct value', async () => {
    const { sut, hashSpy, getUserRepoSpy } = makeSut();
    const hashSpyOn = jest.spyOn(hashSpy, 'create');
    jest.spyOn(getUserRepoSpy, 'getByEmail').mockImplementationOnce(async () => {
      return new NoData();
    });
    await sut.execute({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
    });
    expect(hashSpyOn).toHaveBeenCalledWith('any_id');
  });

  it('should return an error if email already exist', async () => {
    const { sut, getUserRepoSpy } = makeSut();
    jest.spyOn(getUserRepoSpy, 'getByEmail').mockImplementationOnce(() => {
      const user = new User(
        'any_name',
        new Email('any_email'),
        new Password('any_password'),
        'any_id'
      );
      return Promise.resolve(user);
    });
    const accessTokenOrError = await sut.execute({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
    });

    expect(accessTokenOrError).toEqual(new EmailAlreadyExistError());
  });
});
