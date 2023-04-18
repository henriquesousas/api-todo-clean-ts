import { ObjectId } from 'mongodb';
import { CreateUserRepository } from '@src/application/data/repositories/user/create-user.repository';
import { User } from '@src/domain/entities/user';
import { createUserDto } from '@src/domain/usecases/user/create-user';
import { UserMapper } from '@src/infra/data/reporitories/mongo/mapper/user.mapper';
import { BaseMongoRepository } from './base-mongo.repository';
import { GetUserByEmailRepository } from '@src/application/data/repositories/user/get-user-by-email.repository';

export class MongoUserRepository
  extends BaseMongoRepository
  implements CreateUserRepository, GetUserByEmailRepository
{
  getCollection(): string {
    return 'users';
  }

  async create(dto: createUserDto): Promise<User> {
    const insertedId = await this.insert(dto);
    const userDocument = await this.findOne({ _id: new ObjectId(insertedId) });
    return new UserMapper().toObject(userDocument);
  }

  async getByEmail(email: string): Promise<User> {
    const userDocument = await this.findOne({ email });
    return new UserMapper().toObject(userDocument);
  }
}
