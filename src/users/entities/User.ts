import { UserStatus } from './UserStatus';
import { UserRole } from './UserRole';

export type UserId = number;

export type UserProfile = {
  lastName: string;
  firstName: string;
  middleName?: string;
  email: string;
};

export type User = UserProfile & {
  id: UserId;
  status: UserStatus;
  roles: Array<UserRole>;
};

export const getUserId = (user: User): UserId => user.id;
