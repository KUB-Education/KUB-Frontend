import { LecturerId } from './Lecturer.ts';
import { AcademicTitle } from './AcademicTitle.ts';
import { LecturerPosition } from './LecturerPosition.ts';
import { DepartmentId } from '@/departments/entities';
import { LecturerStatus } from './LecturerStatus.ts';

export type EditLecturerParams = {
  id: LecturerId;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  email?: string;
  departmentId?: DepartmentId;
  academicTitle?: AcademicTitle;
  position?: LecturerPosition;
  status?: LecturerStatus;
};
