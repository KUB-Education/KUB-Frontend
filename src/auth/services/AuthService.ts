import { LoginParams } from '../entities';
import { delay, SECOND } from '@/common/utils';
import { BaseService } from '@/common/services';

export class AuthService extends BaseService {
  async login(params: LoginParams): Promise<void> {
    await delay(5 * SECOND);
    console.log(params);

    if (params.email.includes('error')) {
      throw TypeError('Some Error');
    }
  }
}
