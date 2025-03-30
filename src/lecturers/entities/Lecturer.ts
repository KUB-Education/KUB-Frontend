import { AcademicTitle } from './AcademicTitle.ts';
import { LecturerPosition } from './LecturerPosition.ts';
import { Department } from '@/departments/entities';
import { UserStatus } from '@/users/entities';
import { LecturerStatus } from './LecturerStatus.ts';

export type LecturerId = number;

export type Lecturer = {
  id: LecturerId;
  firstName: string;
  lastName: string;
  middleName: string;
  email: string;
  userStatus: UserStatus;
  department: Department;
  academicTitle: AcademicTitle;
  position: LecturerPosition;
  status: LecturerStatus;
};
