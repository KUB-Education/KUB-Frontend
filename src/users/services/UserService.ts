import { BaseService } from '@/common/services';
import { UserProfileDto } from '@/users/services/dto';
import { UserProfileDtoMapper } from '@/users/mappers';

export class UserService extends BaseService {
  async getProfile() {
    const dtoMapper = new UserProfileDtoMapper();

    const { data } = await this.http.get<UserProfileDto>('/user/me');

    return dtoMapper.toEntity(data);
  }
}
