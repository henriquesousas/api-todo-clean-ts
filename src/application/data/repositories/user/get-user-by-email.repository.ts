import { User } from '@src/domain/entities/user';

export interface GetUserByEmailRepository {
  getByEmail(email: string): Promise<User>;
}
