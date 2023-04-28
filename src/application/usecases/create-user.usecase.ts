/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  CreateUser,
  CreateUserResultDto,
  createUserDto,
} from '@src/domain/usecases/user/create-user';
import { Hash } from '@src/application/cryptography/cryptography/hash';
import { Type, isSuccess } from '@src/main/shared/result';
import { CreateUserRepository } from '@src/application/data/repositories/user/create-user.repository';
import { GetUserByEmailRepository } from '@src/application/data/repositories/user/get-user-by-email.repository';
import { EmailAlreadyExistError } from '@src/domain/errors/email_already_existe.error';

export class CreateUserUseCase implements CreateUser {
  constructor(
    private readonly createUserRepo: CreateUserRepository,
    private readonly getUserByEmailRepo: GetUserByEmailRepository,
    private readonly hash: Hash
  ) {}

  async execute(dto: createUserDto): Promise<Type<CreateUserResultDto>> {
    const userOrError = await this.getUserByEmailRepo.getByEmail(dto.email);
    if (isSuccess(userOrError)) {
      return new EmailAlreadyExistError();
    }
    const userId = await this.createUserRepo.create(dto);
    const accessToken = await this.hash.create(userId);
    return {
      accessToken,
    };
  }
}
