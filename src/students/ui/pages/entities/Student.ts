import { UserStatus } from '@/users/entities';

export type StudentId = number;

export type Student = {
  id: StudentId;
  firstName: string;
  lastName: string;
  middleName: string;
  email: string;
  userStatus: UserStatus;
};
