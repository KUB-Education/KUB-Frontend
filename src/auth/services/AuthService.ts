import { LoginParams } from '../entities';

export class AuthService {
  async login(params: LoginParams): Promise<void> {
    console.log(params);
  }
}
