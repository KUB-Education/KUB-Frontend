import { LoginParams, AuthenticatedSession } from '../entities';
import { BaseService } from '@/common/services';
import { AuthenticatedSessionDto } from '@/auth/services/dto';

export class AuthService extends BaseService {
  private isAuthorized: boolean = false;

  async login(params: LoginParams): Promise<AuthenticatedSession> {
    const { data } = await this.http.post<AuthenticatedSessionDto>(
      '/auth/login',
      {
        data: params,
      },
    );
    // TODO add proper logic
    this.isAuthorized = true;
    return {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      firstLogin: data.first_login,
    };
  }

  getIsAuthorized() {
    return this.isAuthorized;
  }
}
