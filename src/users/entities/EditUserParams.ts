import { UserId } from './User.ts';

export type EditUserParams = {
  id: UserId;
  lastName: string;
  firstName: string;
  middleName: string;
  email: string;
};
