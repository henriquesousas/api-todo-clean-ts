import { Document, FilterOperations } from 'mongodb';
import { MongoHelper } from './mongo-helper';

export abstract class BaseMongoRepository {
  abstract getCollection(): string;

  async insert(data: FilterOperations<string>): Promise<string> {
    const result = await MongoHelper.getCollection(this.getCollection()).insertOne(data);
    return result.insertedId.toString();
  }

  async findOne(
    filter: FilterOperations<string>,
    projection?: FilterOperations<string>
  ): Promise<Document> {
    const document = await MongoHelper.getCollection(this.getCollection()).findOne(
      filter,
      {
        projection: projection?.fields ?? {},
      }
    );

    return document && MongoHelper.map(document);
  }

  async update(filter: FilterOperations<string>, data: FilterOperations<Document>) {
    await MongoHelper.getCollection(this.getCollection()).updateOne(filter, {
      $set: data,
    });
  }

  async delete(data: FilterOperations<Document>) {
    await MongoHelper.getCollection(this.getCollection()).deleteOne(data);
  }

  async aggregate(query: any[]): Promise<Document[]> {
    const documents = await MongoHelper.getCollection(this.getCollection())
      .aggregate(query)
      .toArray();
    return documents;
  }
}
