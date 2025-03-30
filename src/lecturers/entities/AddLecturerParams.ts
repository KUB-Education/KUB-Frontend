import { AcademicTitle } from './AcademicTitle.ts';
import { LecturerPosition } from './LecturerPosition.ts';
import { DepartmentId } from '@/departments/entities';
import { LecturerStatus } from './LecturerStatus.ts';

export type AddLecturerParams = {
  firstName: string;
  lastName: string;
  middleName: string;
  email: string;
  departmentId: DepartmentId;
  academicTitle: AcademicTitle;
  position: LecturerPosition;
  status: LecturerStatus;
};
