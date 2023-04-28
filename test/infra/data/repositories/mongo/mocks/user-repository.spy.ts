import { CreateUserRepository } from '@src/application/data/repositories/user/create-user.repository';
import { GetUserByEmailRepository } from '@src/application/data/repositories/user/get-user-by-email.repository';
import { User } from '@src/domain/entities/user';
import { createUserDto } from '@src/domain/usecases/user/create-user';
import { NoData } from '@src/infra/data/reporitories/errors/no-data';
import { Type } from '@src/main/shared/result';

export class UserRepositorySpy implements CreateUserRepository, GetUserByEmailRepository {
  async getByEmail(_: string): Promise<Type<User>> {
    return new NoData();
  }

  async create(_: createUserDto): Promise<string> {
    return Promise.resolve('any_id');
  }
}
