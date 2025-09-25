import { UserId, UserStatus } from '@/users/entities';

export type UserDto = {
  id: UserId;
  last_name: string;
  first_name: string;
  middle_name: string;
  email: string;
  user_status: UserStatus;
  roles: Array<{ id: number; name: string }>;
};
