import { UserStatus } from './UserStatus.ts';
import { UserProfile } from './UserProfile.ts';

export type UserId = number;

export type User = UserProfile & {
  id: UserId;
  userStatus: UserStatus;
};

export const getUserId = (user: User): UserId => user.id;
