import { PersistentStorage } from '@/common/persistent-storage';
import { AccessToken, RefreshToken } from '@/auth/entities';

export class AuthTokensStorage {
  constructor(private readonly persistentStorage: PersistentStorage) {}

  getAccessToken(): string {
    const token = this.persistentStorage.get<string>('access_token');

    return token || '';
  }

  setAccessToken(accessToken: AccessToken) {
    this.persistentStorage.set('access_token', accessToken);
  }

  resetAccessToken(): void {
    this.persistentStorage.set('access_token', '');
  }

  getRefreshToken(): string {
    const token = this.persistentStorage.get<string>('refresh_token');

    return token || '';
  }

  setRefreshToken(refreshToken: RefreshToken) {
    this.persistentStorage.set('refresh_token', refreshToken);
  }

  resetRefreshToken(): void {
    this.persistentStorage.set('refresh_token', '');
  }
}
