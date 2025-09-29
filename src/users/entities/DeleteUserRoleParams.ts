import { UserId } from './User.ts';
import { UserRole } from './UserRole.ts';

export type DeleteUserRoleParams = {
  userId: UserId;
  role: UserRole;
};
