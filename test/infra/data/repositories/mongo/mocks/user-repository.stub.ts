import { CreateUserRepository } from '@src/application/data/repositories/user/create-user.repository';
import { GetUserByEmailRepository } from '@src/application/data/repositories/user/get-user-by-email.repository';
import { User } from '@src/domain/entities/user';
import { createUserDto } from '@src/domain/usecases/user/create-user';
import { Type } from '@src/main/shared/result';
import { userMock } from '@test/domain/entities/mocks/user.mock';

export class UserRepositoryStub
  implements CreateUserRepository, GetUserByEmailRepository
{
  async getByEmail(_: string): Promise<Type<User>> {
    return Promise.resolve(userMock());
  }

  async create(_: createUserDto): Promise<string> {
    return Promise.resolve('any_id');
  }
}
