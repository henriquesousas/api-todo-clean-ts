import { Password } from '@src/domain/entities/password';
import { User } from '@src/domain/entities/user';
import { Email } from '@src/domain/entities/email';
import { InvalidEmailError } from '@src/domain/errors/invalid-email-error';
import { RequiredMinLenError } from '@src/domain/errors/required-min-len-error';

jest.mock('../../domain/entities/email.spec');

describe('User', () => {
  it('should return User', () => {
    const email = new Email('any_email');
    const password = new Password('any_passowrd');

    jest.spyOn(Email, 'create').mockReturnValue(email);
    jest.spyOn(Password, 'create').mockReturnValue(password);

    const sut = User.create('any_name', 'any_email', 'any_passowrd') as User;
    expect(sut).toEqual(new User('any_name', email, password));
  });

  it('should return InvalidEmailError', () => {
    jest.spyOn(Email, 'create').mockReturnValue(new InvalidEmailError('any_email'));
    const sut = User.create('any_name', 'any_email', 'any_passowrd') as InvalidEmailError;
    expect(sut).toEqual(new InvalidEmailError('any_email'));
  });

  it('should return RequiredMinLenError', () => {
    jest.spyOn(Email, 'create').mockReturnValue(new Email('any_email'));
    jest
      .spyOn(Password, 'create')
      .mockReturnValue(new RequiredMinLenError('any_value', 1));

    const sut = User.create(
      'any_name',
      'any_email',
      'any_passowrd'
    ) as RequiredMinLenError;

    expect(sut).toEqual(new RequiredMinLenError('any_value', 1));
  });
});
