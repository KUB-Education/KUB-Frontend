import { UserId, UserStatus } from '@/users/entities';
import { UserRoleDto } from './UserRoleDto';

export type UserDto = {
  id: UserId;
  last_name: string;
  first_name: string;
  middle_name: string;
  email: string;
  status: UserStatus;
  roles: Array<UserRoleDto>;
};
