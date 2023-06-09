import { Email } from '@src/domain/entities/email';
import { InvalidEmailError } from '@src/domain/errors/invalid-email-error';

describe('Email', () => {
  it('should return Email when provide a valid email', () => {
    const emailValue = 'any_email@gmail.com';
    const email = Email.create(emailValue) as Email;
    expect(email).toEqual(new Email(emailValue));
    expect(email.value).toBe(emailValue);
  });

  it('should return Error when provide a email without @', () => {
    const emailValue = 'any_emailgmail.com';
    const error = Email.create(emailValue) as InvalidEmailError;
    expect(error.message).toBe(`Email ${emailValue} inválido`);
  });

  it('should return Error when provide a email without .', () => {
    const emailValue = 'any_email@gmailcom';
    const error = Email.create(emailValue) as InvalidEmailError;
    expect(error.message).toBe(`Email ${emailValue} inválido`);
  });
});
