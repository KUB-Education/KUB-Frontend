import { ToEntity } from '@/common/mappers';
import { CurrentUser } from '@/users/entities';
import { UserDto } from '@/users/services/dto';

export class UserDtoMapper implements ToEntity<CurrentUser, UserDto> {
  toEntity(dto: UserDto): CurrentUser {
    return {
      id: dto.id,
      firstName: dto.first_name,
      lastName: dto.last_name,
      middleName: dto.middle_name,
      email: dto.email,
      userStatus: dto.user_status,
      roles: dto.roles,
    };
  }
}
