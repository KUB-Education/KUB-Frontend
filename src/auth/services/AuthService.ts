import { LoginParams } from '../entities';
import { delay, SECOND } from '@/common/utils';
import { BaseService } from '@/common/services';

export class AuthService extends BaseService {
  private isAuthorized: boolean = false;
  // TODO update to real endpoint
  async login(params: LoginParams): Promise<void> {
    await delay(5 * SECOND);
    console.log(params);

    if (params.email.includes('error')) {
      throw TypeError('Some Error');
    }

    this.isAuthorized = true;
  }

  getIsAuthorized() {
    return this.isAuthorized;
  }
}
