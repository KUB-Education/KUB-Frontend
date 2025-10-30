import { StudentGroup } from '@/student-groups/entities';
import { User } from '@/users/entities';
import { EducationalProgram } from '@/educational-programs/entities';

export type StudentId = Student['id'];

export type Student = User & {
  groups: StudentGroup[];
  educationalPrograms: EducationalProgram[];
};
