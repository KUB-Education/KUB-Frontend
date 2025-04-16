import { StudentId } from './Student.ts';

export type EditStudentParams = {
  id: StudentId;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  email?: string;
};
