import { StudentGroupId } from '@/student-groups/entities';

export type EditStudentGroupParams = {
  id: StudentGroupId;
  name?: string;
};
