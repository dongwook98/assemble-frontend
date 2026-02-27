export interface ApiSuccess<T> {
  isSuccess: true;
  code: string;
  message: string;
  result: T;
  timestamp: string;
}

export interface ApiErrorResponse<C extends string = string> {
  isSuccess: false;
  code: C;
  message: string;
  timestamp: string;
}
