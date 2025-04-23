export class UnknownError extends Error {
  public originalError: unknown;

  public message: string;

  public details: string;

  constructor(originalError: unknown) {
    super();
    this.originalError = originalError;
    this.message = 'Unknown error';
    this.details = JSON.stringify(originalError);
  }
}
