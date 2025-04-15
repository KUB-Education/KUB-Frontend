/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { HttpClient } from '../interfaces';
import { HttpRequestConfig, HttpResponse } from '../entities';
import { ApiError } from '@/common/errors/ApiError.ts';
import { normalizeError } from '@/common/utils/errors.ts';
import { WithRequired } from '@/common/types';

export class AxiosHttpClient implements HttpClient {
  private readonly client: AxiosInstance;

  constructor(
    private readonly baseUrl: string,
    private readonly config?: AxiosRequestConfig,
  ) {
    this.client = axios.create({
      ...(this.config || {}),
    });
  }

  addRequestInterceptor(
    interceptor: (
      config: WithRequired<HttpRequestConfig, 'headers'>,
    ) => WithRequired<HttpRequestConfig, 'headers'>,
  ) {
    this.client.interceptors.request.use(interceptor);
  }

  async get<ResponseData = any>(url: string, config: HttpRequestConfig = {}) {
    return this.request<ResponseData>({
      url,
      method: 'GET',
      ...config,
    });
  }

  async post<ResponseData = any>(url: string, config: HttpRequestConfig = {}) {
    return this.request<ResponseData>({
      url,
      method: 'POST',
      ...config,
    });
  }

  async put<ResponseData = any>(url: string, config: HttpRequestConfig = {}) {
    return this.request<ResponseData>({
      url,
      method: 'PUT',
      ...config,
    });
  }

  async delete<ResponseData = any>(
    url: string,
    config: HttpRequestConfig = {},
  ) {
    return this.request<ResponseData>({
      url,
      method: 'DELETE',
      ...config,
    });
  }

  private async request<ResponseData = any>(
    config: AxiosRequestConfig,
  ): Promise<HttpResponse<ResponseData>> {
    try {
      return await this.client.request({
        ...config,
        baseURL: this.baseUrl,
        method: config.method,
        headers: {
          'content-type': 'application/json',
          ...config.headers,
        },
        withCredentials: true,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new ApiError({
          cause: error.cause,
          code: error.code,
          config: error.config,
          status: error.status,
          response: error.response,
        });
      }

      throw normalizeError(error);
    }
  }
}
