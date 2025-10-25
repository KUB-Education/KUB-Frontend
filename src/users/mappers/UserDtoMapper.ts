import { ToEntity } from '@/common/mappers';
import { User } from '@/users/entities';
import { UserDto } from '@/users/services/dto';

export class UserDtoMapper implements ToEntity<User, UserDto> {
  toEntity(dto: UserDto): User {
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
