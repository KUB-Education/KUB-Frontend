import { LecturerId } from './Lecturer.ts';

export type EditLecturerParams = {
  id: LecturerId;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  email?: string;
  department?: string;
  academicTitle?: string;
  position?: string;
  status?: string;
};
