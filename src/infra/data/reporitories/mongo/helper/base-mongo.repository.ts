import { Document, FilterOperations, ObjectId } from 'mongodb';
import { MongoHelper } from './mongo-helper';

export abstract class BaseMongoRepository {
  abstract getCollection(): string;

  async insert(data: FilterOperations<string>): Promise<string> {
    const result = await MongoHelper.getCollection(this.getCollection()).insertOne(data);
    return result.insertedId.toString();
  }

  protected async findOne(
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

  protected async find(
    filter: FilterOperations<string>,
    projection?: FilterOperations<string>
  ): Promise<Document[]> {
    const document = await MongoHelper.getCollection(this.getCollection())
      .find(filter, {
        projection: projection?.fields ?? {},
      })
      .toArray();

    return document && MongoHelper.maps(document);
  }

  protected async update(
    filter: FilterOperations<string>,
    data: FilterOperations<Document>
  ) {
    await MongoHelper.getCollection(this.getCollection()).updateOne(filter, {
      $set: data,
    });
  }

  protected async deleteOne(filter: FilterOperations<string>) {
    await MongoHelper.getCollection(this.getCollection()).deleteOne(filter);
  }

  protected async aggregate(query: any[]): Promise<Document[]> {
    const documents = await MongoHelper.getCollection(this.getCollection())
      .aggregate(query)
      .toArray();
    return documents;
  }
}
