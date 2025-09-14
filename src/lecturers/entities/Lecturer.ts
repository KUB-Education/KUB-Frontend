import { AcademicTitle } from './AcademicTitle.ts';
import { LecturerPosition } from './LecturerPosition.ts';
import { Department } from '@/departments/entities';
import { User } from '@/users/entities';
import { LecturerStatus } from './LecturerStatus.ts';

export type LecturerId = User['id'];

export type Lecturer = User & {
  department: Department;
  academicTitle: AcademicTitle;
  position: LecturerPosition;
  status: LecturerStatus;
};
