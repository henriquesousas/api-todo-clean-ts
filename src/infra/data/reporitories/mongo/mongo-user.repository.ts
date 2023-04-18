import { ObjectId } from 'mongodb';
import { CreateUserRepository } from '@src/application/data/repositories/user/create-user.repository';
import { User } from '@src/domain/entities/user';
import { createUserDto } from '@src/domain/usecases/user/create-user';
import { MongoHelper } from '@src/infra/data/reporitories/mongo/mongo-helper';
import { UserMapper } from '@src/infra/data/reporitories/mongo/mapper/user.mapper';

export class MongoUserRepository implements CreateUserRepository {
  async create(dto: createUserDto): Promise<User> {
    const collection = MongoHelper.getCollection('users');
    const data = await collection.insertOne(dto);
    const document = await collection.findOne({
      _id: new ObjectId(data.insertedId.toHexString()),
    });
    return new UserMapper().toObject(MongoHelper.map(document))
  }
}
