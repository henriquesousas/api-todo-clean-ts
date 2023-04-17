export type ApplicationErrorParams = {
  code: number;
  message: string;
};

export type ApplicationErrorResult = {
  error: ApplicationErrorParams;
};

export abstract class ApplicationError extends Error {
  constructor(readonly code: number, readonly message: string) {
    super(message);
  }

  public serializeError(): ApplicationErrorResult {
    return {
      error: {
        code: this.code,
        message: this.message,
      },
    };
  }
}
