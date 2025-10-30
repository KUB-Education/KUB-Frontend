import { LecturerId } from './Lecturer.ts';
import { UserId } from '@/users/entities';

export type EditLecturerParams = {
  lecturerId: LecturerId;
  userId: UserId;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  email?: string;
};
