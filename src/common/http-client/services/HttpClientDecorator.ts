/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '../interfaces';
import { HttpRequestConfig, HttpResponse } from '../entities';
import { WithRequired } from '@/common/types';

export class HttpClientDecorator implements HttpClient {
  constructor(private readonly httpClient: HttpClient) {}

  delete<ResponseData = any>(
    url: string,
    config?: HttpRequestConfig,
  ): Promise<HttpResponse<ResponseData>> {
    return this.httpClient.delete(url, config);
  }

  get<ResponseData = any>(
    url: string,
    config?: HttpRequestConfig,
  ): Promise<HttpResponse<ResponseData>> {
    return this.httpClient.get(url, config);
  }

  post<ResponseData = any>(
    url: string,
    config?: HttpRequestConfig,
  ): Promise<HttpResponse<ResponseData>> {
    return this.httpClient.post(url, config);
  }

  put<ResponseData = any>(
    url: string,
    config?: HttpRequestConfig,
  ): Promise<HttpResponse<ResponseData>> {
    return this.httpClient.put(url, config);
  }

  addRequestInterceptor(
    interceptor: (
      config: WithRequired<HttpRequestConfig, 'headers'>,
    ) => WithRequired<HttpRequestConfig, 'headers'>,
  ) {
    return this.httpClient.addRequestInterceptor(interceptor);
  }
}
