import { StudentId } from './Student';
import { StudentGroupId } from '@/student-groups/entities';

export type EditStudentParams = {
  id: StudentId;
  lastName?: string;
  firstName?: string;
  middleName?: string;
  email?: string;
  groups?: Array<StudentGroupId>;
};
