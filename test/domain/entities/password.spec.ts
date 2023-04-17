import { Password } from '@src/domain/entities/password';
import { RequiredMinLenError } from '@src/domain/errors/required-min-len-error';

describe('Password', () => {
  it('should return Password when provide a value min 6 character', () => {
    const value = '123456';
    const password = Password.create(value) as Password;
    expect(password).toEqual(new Password(value));
    expect(password.value).toBe(value);
  });

  it('should return Error when provide a password less than 6 character', () => {
    const value = '1234';
    const password = Password.create(value) as RequiredMinLenError;
    expect(password).toEqual(
      new RequiredMinLenError('Password', Password.REQUIRED_MIN_LENGHT)
    );
  });
});
