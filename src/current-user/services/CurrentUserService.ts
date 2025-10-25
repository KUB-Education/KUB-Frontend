import { BaseService } from '@/common/services';
import { UserDtoMapper } from '@/users/mappers';
import { CurrentUserDto } from './dto';
import { CurrentUser } from '@/current-user/entities';

export class CurrentUserService extends BaseService {
  async getCurrentUser(): Promise<CurrentUser> {
    const dtoMapper = new UserDtoMapper();

    const { data } = await this.http.get<CurrentUserDto>('/account/me');

    return dtoMapper.toEntity(data);
  }
}
