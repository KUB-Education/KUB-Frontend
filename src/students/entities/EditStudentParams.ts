import { StudentId } from './Student';
import { StudentGroupId } from '@/student-groups/entities';
import { EducationalProgramId } from '@/educational-programs/entities';

export type EditStudentParams = {
  id: StudentId;
  lastName?: string;
  firstName?: string;
  middleName?: string;
  email?: string;
  groups?: Array<StudentGroupId>;
  educationalPrograms?: Array<EducationalProgramId>;
};
