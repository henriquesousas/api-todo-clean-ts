import { createUserDto } from '@src/domain/usecases/user/create-user';

export interface CreateUserRepository {
  create(dto: createUserDto): Promise<string>;
}
