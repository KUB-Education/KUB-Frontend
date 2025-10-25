import { LoginParams, AuthenticatedSession } from '../entities';
import { BaseService } from '@/common/services';
import { AuthenticatedSessionDto } from '@/auth/services/dto';
import { AuthenticatedSessionDtoMapper } from '@/auth/mappers';
import {
  HttpClientWithSessionRefresh,
  HttpRequestConfig,
} from '@/common/http-client';
import { AuthTokensStorage } from './AuthTokensStorage.ts';
import { WithRequired } from '@/common/types';

export class AuthService extends BaseService {
  private unauthorizedListeners: Array<(reason: Error) => void> = [];

  constructor(
    httpClient: HttpClientWithSessionRefresh,
    private readonly authTokensStorage: AuthTokensStorage,
  ) {
    super(httpClient);

    httpClient.onSessionRefreshFailed(
      this.handleSessionRefreshFailed.bind(this),
    );
    httpClient.onSessionRefreshed(this.handleSessionRefreshed.bind(this));

    httpClient.addRequestInterceptor(this.handleRequestInterception.bind(this));
  }

  onUnauthorized(listener: (reason: Error) => void) {
    this.unauthorizedListeners.push(listener);
  }

  async login(params: LoginParams): Promise<AuthenticatedSession> {
    const dtoMapper = new AuthenticatedSessionDtoMapper();

    const { data } = await this.http.post<AuthenticatedSessionDto>(
      '/auth/login',
      {
        data: params,
      },
    );

    const session = dtoMapper.toEntity(data);

    this.authTokensStorage.setAccessToken(session.accessToken);
    this.authTokensStorage.setRefreshToken(session.refreshToken);

    return session;
  }

  async logout(): Promise<void> {
    await this.http.post('/auth/logout');
    this.authTokensStorage.resetAccessToken();
    this.authTokensStorage.resetRefreshToken();
  }

  async changePassword(params: {
    currentPassword: string;
    newPassword: string;
  }): Promise<void> {
    await this.http.post('/account/change-password', {
      data: {
        old_password: params.currentPassword,
        new_password: params.newPassword,
      },
    });
  }

  async resetPassword(params: { email: string }): Promise<void> {
    await this.http.post('/account/recovery-password', {
      data: params,
    });
  }

  getIsAuthorized() {
    const token = this.authTokensStorage.getRefreshToken();
    return !!token;
  }

  private handleSessionRefreshFailed(reason: Error) {
    // if (reason.message === ErrorMessages.NETWORK_ERROR) return;

    this.resetAuthorizationState();
    this.notifyUnauthorizedListeners(reason);
  }

  private notifyUnauthorizedListeners(reason: Error) {
    this.unauthorizedListeners.forEach((listener) => {
      try {
        listener(reason);
      } catch (err) {
        console.error(err);
      }
    });
  }

  private handleSessionRefreshed(session: AuthenticatedSessionDto) {
    const { access_token, refresh_token } = session;

    this.authTokensStorage.setAccessToken(access_token);
    this.authTokensStorage.setRefreshToken(refresh_token);
  }

  private resetAuthorizationState() {
    this.authTokensStorage.resetAccessToken();
    this.authTokensStorage.resetRefreshToken();
  }

  private handleRequestInterception(
    config: WithRequired<HttpRequestConfig, 'headers'>,
  ) {
    const token = this.authTokensStorage.getAccessToken();

    if (config.url && config.url.includes('/auth/refresh')) {
      return config;
    }

    config.headers.set('Authorization', `Bearer ${token}`);

    return config;
  }
}
