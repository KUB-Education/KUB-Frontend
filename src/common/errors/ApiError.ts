import {
  getHttpStatusReasonPhrase,
  HttpRequestConfig,
  HttpResponse,
} from '../http-client';
import { isString } from '@/common/utils/strings.ts';

type ApiErrorProperties = Partial<{
  config: HttpRequestConfig;
  code: string;
  response: HttpResponse;
  status: number;
  cause: Error;
}>;

const parseMessageFormProperties = (properties: ApiErrorProperties) => {
  const { response, status } = properties;

  if (response?.data && isString(response.data.detail)) {
    return response.data.detail;
  }

  if (status) {
    return getHttpStatusReasonPhrase(status);
  }

  return 'API error occurred';
};

export class ApiError extends Error {
  constructor(private readonly properties: ApiErrorProperties) {
    const message = parseMessageFormProperties(properties);

    super(message);
  }

  getStatus() {
    return this.properties.status;
  }

  getResponse() {
    return this.properties.response;
  }
}
