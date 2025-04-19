import { ToEntity } from '@/common/mappers';
import { UserProfile } from '@/users/entities';
import { UserProfileDto } from '@/users/services/dto';

export class UserProfileDtoMapper
  implements ToEntity<UserProfile, UserProfileDto>
{
  toEntity(dto: UserProfileDto): UserProfile {
    return {
      firstName: dto.first_name,
      lastName: dto.last_name,
      middleName: dto.middle_name,
      email: dto.email,
    };
  }
}
