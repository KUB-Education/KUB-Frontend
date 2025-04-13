import { HttpClient } from '@/common/http-client';

export class BaseService {
  constructor(protected readonly http: HttpClient) {}
}
