import { User } from '@src/domain/entities/user';
import { createUserDto } from '@src/domain/usecases/user/create-user';

export interface CreateUserRepository {
  create(dto: createUserDto): Promise<User>;
}
