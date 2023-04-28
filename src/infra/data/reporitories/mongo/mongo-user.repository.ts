import { CreateUserRepository } from '@src/application/data/repositories/user/create-user.repository';
import { User } from '@src/domain/entities/user';
import { createUserDto } from '@src/domain/usecases/user/create-user';
import { UserMapper } from '@src/infra/data/reporitories/mongo/mapper/user.mapper';
import { BaseMongoRepository } from './helper/base-mongo.repository';
import { GetUserByEmailRepository } from '@src/application/data/repositories/user/get-user-by-email.repository';
import { Type } from '@src/main/shared/result';
import { NoData } from '../errors/no-data';

export class MongoUserRepository
  extends BaseMongoRepository
  implements CreateUserRepository, GetUserByEmailRepository
{
  getCollection = (): string => 'users';

  async create(dto: createUserDto): Promise<string> {
    return await this.insert(dto);
  }

  async getByEmail(email: string): Promise<Type<User>> {
    const userDocument = await this.findOne({ email });
    console.log(userDocument);

    return userDocument ? new UserMapper().toObject(userDocument) : new NoData();
  }
}
