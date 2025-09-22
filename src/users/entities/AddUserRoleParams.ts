import { UserId } from './User.ts';
import { UserRole } from './UserRole.ts';

export type AddUserRoleParams = {
  userId: UserId;
  role: UserRole;
};
