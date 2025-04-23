import { HttpRequestConfig, HttpResponse } from '../http-client/entities';

type ApiErrorProperties = Partial<{
  config?: HttpRequestConfig;
  code?: string;
  response?: HttpResponse;
  status?: number;
  cause?: Error;
}>;

export class ApiError extends Error {
  constructor(private readonly properties: ApiErrorProperties) {
    const message = properties.cause
      ? properties.cause.message
      : 'Network error occurred';

    super(message);
  }

  getStatus() {
    return this.properties.status;
  }
}
