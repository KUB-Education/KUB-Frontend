/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '../interfaces';
import { HttpClientDecorator } from './HttpClientDecorator';
import { HttpRequestConfig, HttpResponse } from '@/common/http-client';
import { AuthenticatedSessionDto } from '@/auth/services/dto';
import { ApiError } from '@/common/errors';
import { HttpStatusCodes } from '../entities';
import { AuthTokensStorage } from '@/auth/services';

export class HttpClientWithSessionRefresh extends HttpClientDecorator {
  constructor(
    httpClient: HttpClient,
    private readonly authTokensStorage: AuthTokensStorage,
  ) {
    super(httpClient);
  }

  private refreshAccessJob: Promise<
    HttpResponse<AuthenticatedSessionDto>
  > | null = null;

  private sessionRefreshFailedListeners: Array<(reason: Error) => void> = [];

  private accessRefreshedListeners: Array<
    (session: AuthenticatedSessionDto) => void
  > = [];

  onSessionRefreshFailed(listener: (reason: Error) => void) {
    this.sessionRefreshFailedListeners.push(listener);
  }

  onSessionRefreshed(listener: (session: AuthenticatedSessionDto) => void) {
    this.accessRefreshedListeners.push(listener);
  }

  async delete<ResponseData = any>(
    url: string,
    config?: HttpRequestConfig,
  ): Promise<HttpResponse<ResponseData>> {
    try {
      return await super.delete<ResponseData>(url, config);
    } catch (err) {
      if (!this.isAccessForbiddenError(err)) {
        throw err;
      }

      await this.refreshAccess(err);
      return super.delete<ResponseData>(url, config);
    }
  }

  async get<ResponseData = any>(
    url: string,
    config?: HttpRequestConfig,
  ): Promise<HttpResponse<ResponseData>> {
    try {
      return await super.get<ResponseData>(url, config);
    } catch (err) {
      if (!this.isAccessForbiddenError(err)) {
        throw err;
      }

      await this.refreshAccess(err);
      return super.get<ResponseData>(url, config);
    }
  }

  async post<ResponseData = any>(
    url: string,
    config?: HttpRequestConfig,
  ): Promise<HttpResponse<ResponseData>> {
    try {
      return await super.post<ResponseData>(url, config);
    } catch (err) {
      if (!this.isAccessForbiddenError(err)) {
        throw err;
      }

      await this.refreshAccess(err);
      return super.post<ResponseData>(url, config);
    }
  }

  async put<ResponseData = any>(
    url: string,
    config?: HttpRequestConfig,
  ): Promise<HttpResponse<ResponseData>> {
    try {
      return await super.put<ResponseData>(url, config);
    } catch (err) {
      if (!this.isAccessForbiddenError(err)) {
        throw err;
      }

      await this.refreshAccess(err);
      return super.put<ResponseData>(url, config);
    }
  }

  private async refreshAccess(error: unknown) {
    if (this.refreshAccessJob) return this.refreshAccessJob;

    const refreshToken = this.authTokensStorage.getRefreshToken();

    if (!refreshToken) throw error;

    this.refreshAccessJob = super.post<AuthenticatedSessionDto>(
      '/auth/refresh',
      {
        data: {
          refresh_token: refreshToken,
        },
      },
    );

    this.refreshAccessJob
      .then(({ data }) => {
        this.notifyAccessRefreshed(data);
      })
      .catch((err: ApiError) => {
        this.notifySessionRefreshFailed(err);

        throw err;
      })
      .finally(() => {
        this.refreshAccessJob = null;
      });

    return this.refreshAccessJob;
  }

  private isAccessForbiddenError(error: unknown) {
    return (
      error instanceof ApiError &&
      error.getStatus() === HttpStatusCodes.UNAUTHORIZED
    );
  }

  private notifySessionRefreshFailed(reason: Error) {
    this.sessionRefreshFailedListeners.forEach((listener) => {
      try {
        listener(reason);
      } catch (err) {
        console.error(err);
      }
    });
  }

  private notifyAccessRefreshed(session: AuthenticatedSessionDto) {
    this.accessRefreshedListeners.forEach((listener) => {
      try {
        listener(session);
      } catch (err) {
        console.error(err);
      }
    });
  }
}
