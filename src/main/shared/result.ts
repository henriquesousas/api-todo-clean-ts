import { DomainError } from '@src/domain/errors/base/domain-error';
import { ApplicationError } from '@src/domain/errors/base/application-error';

type Result<T> = T | ApplicationError;
export type Type<T> = Result<T>;

export function isError<T>(result: Result<T>): result is DomainError {
  return result instanceof Error;
}

export function isSuccess<T>(result: Result<T>): result is T {
  return !isError(result);
}
