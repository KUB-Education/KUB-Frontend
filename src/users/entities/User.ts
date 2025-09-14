import { UserStatus } from './UserStatus.ts';
import { UserProfile } from './UserProfile.ts';

export type UserId = number;

export type User = UserProfile & {
  id: UserId;
  userStatus: UserStatus;
};
