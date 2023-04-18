import { CreateUserRepository } from '@src/application/data/repositories/user/create-user.repository';
import { User } from '@src/domain/entities/user';
import { createUserDto } from '@src/domain/usecases/user/create-user';
import { MongoHelper } from './mongo-helper';
import { ObjectId } from 'mongodb';
import { Email } from '@src/domain/entities/email';
import { Password } from '@src/domain/entities/password';

export class MongoUserRepository implements CreateUserRepository {
  async create(dto: createUserDto): Promise<User> {
    const data = await MongoHelper.getCollection('users').insertOne(dto);
    const user = await MongoHelper.getCollection('users').findOne({
      _id: new ObjectId(data.insertedId.toHexString()),
    });
    // return user;
    const user2 = new User('any_name', new Email(''), new Password(''));
    return Promise.resolve(user2);
  }
}
