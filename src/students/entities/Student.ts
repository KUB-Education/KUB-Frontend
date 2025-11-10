import { StudentGroup } from '@/student-groups/entities';
import { User } from '@/users/entities';
import { StudentEducationalProgram } from './StudentEducationalProgram';

export type StudentId = Student['id'];

export type Student = User & {
  groups: StudentGroup[];
  educationalPrograms: StudentEducationalProgram[];
};
