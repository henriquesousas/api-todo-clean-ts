import { Type } from '@src/main/shared/result';

export type createUserDto = {
  name: string;
  email: string;
  password: string;
};

export type CreateUserResultDto = {
  accessToken: string;
};

export interface CreateUser {
  execute(dto: createUserDto): Promise<Type<CreateUserResultDto>>;
}
