import { UserStatus } from './UserStatus.ts';

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
  roles: Array<{ id: number; name: string }>;
};

export const getUserId = (user: User): UserId => user.id;
