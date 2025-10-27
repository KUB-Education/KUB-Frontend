import { UserStatus } from './UserStatus';
import { UserRole } from '@/users/entities/UserRole';

export type UserId = number;

type UserProfile = {
  lastName: string;
  firstName: string;
  middleName: string;
  email: string;
};

export type User = UserProfile & {
  id: UserId;
  userStatus: UserStatus;
  roles: Array<{ id: number; type: UserRole }>;
};

export const getUserId = (user: User): UserId => user.id;
