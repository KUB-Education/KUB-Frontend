/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpRequestConfig, HttpResponse } from '../entities';
import { WithRequired } from '@/common/types';

export interface HttpClient {
  get<ResponseData = any>(
    url: string,
    config?: HttpRequestConfig,
  ): Promise<HttpResponse<ResponseData>>;
  post<ResponseData = any>(
    url: string,
    config?: HttpRequestConfig,
  ): Promise<HttpResponse<ResponseData>>;
  put<ResponseData = any>(
    url: string,
    config?: HttpRequestConfig,
  ): Promise<HttpResponse<ResponseData>>;
  delete<ResponseData = any>(
    url: string,
    config?: HttpRequestConfig,
  ): Promise<HttpResponse<ResponseData>>;

  addRequestInterceptor(
    interceptor: (
      config: WithRequired<HttpRequestConfig, 'headers'>,
    ) => WithRequired<HttpRequestConfig, 'headers'>,
  ): void;
}
