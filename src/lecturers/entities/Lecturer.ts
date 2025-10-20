import { AcademicTitle } from './AcademicTitle';
import { User } from '@/users/entities';
import { LecturerDepartment } from './LecturerDepartment';

export type LecturerId = User['id'];

export type Lecturer = User & {
  departments: LecturerDepartment[];
  academicTitles: AcademicTitle[];
};
