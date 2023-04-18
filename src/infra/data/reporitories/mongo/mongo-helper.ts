import { Collection, MongoClient } from 'mongodb';

export class MongoHelper {
  private static client?: MongoClient | null;

  static async connect(uri: string): Promise<void> {
    if (this.client == null) {
      this.client = await MongoClient.connect(uri, {});
    }
  }

  static async disconnect(): Promise<void> {
    await this.client?.close();
  }

  static getCollection(name: string): Collection {
    if (this.client) return this.client.db().collection(name);
    throw new Error('MongoDb client is null');
  }

  static map(document: any): any {
    if (document == null) return null;
    const { _id, ...collectionWithoutMongoId } = document;
    return { ...collectionWithoutMongoId, id: _id.toString() };
  }

  static maps(documents: any[]): any[] {
    return documents.map((doc) => this.map(doc));
  }
}
