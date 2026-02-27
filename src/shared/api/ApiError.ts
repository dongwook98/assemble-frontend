export class ApiError<C extends string = string> extends Error {
  constructor(
    public code: C,
    message: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}
