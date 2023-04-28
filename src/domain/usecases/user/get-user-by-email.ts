import { User } from '@src/domain/entities/user';
import { Type } from '@src/main/shared/result';

export interface GetUserByEmail {
  execute(email: string): Promise<Type<User>>;
}
