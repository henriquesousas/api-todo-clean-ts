import { Hash } from '@src/application/cryptography/cryptography/hash';

export class HashSpy implements Hash {
  async create(_: string): Promise<string> {
    return await Promise.resolve('any_access_token');
  }
}
