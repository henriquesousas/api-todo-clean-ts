import { GetUserByEmail } from '@src/domain/usecases/user/get-user-by-email';
import { GetUserByEmailRepository } from '@src/application/data/repositories/user/get-user-by-email.repository';
import { User } from '@src/domain/entities/user';
import { Type, isError } from '@src/main/shared/result';
import { UserNotFoundError } from '@src/domain/errors/user-not-found.error';

export class GetUserByEmailUseCase implements GetUserByEmail {
  constructor(private readonly getUserRepo: GetUserByEmailRepository) {}
  async execute(email: string): Promise<Type<User>> {
    const userOrError = await this.getUserRepo.getByEmail(email);
    if (isError(userOrError)) {
      return new UserNotFoundError();
    }
    return userOrError;
  }
}
